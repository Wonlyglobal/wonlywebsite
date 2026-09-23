import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const SCHEMA_VERSION = '1.0';
export const MAX_CURRENT_BYTES = 256 * 1024;
export const MAX_HISTORY_BYTES = 1024 * 1024;
export const MAX_INPUT_BYTES = 512 * 1024;
export const MAX_HISTORY_DAYS = 90;
export const SIGNATURE_MAX_SKEW_SECONDS = 300;

const STATUSES = new Set(['ok', 'partial', 'missing', 'stale']);
const EXPERIMENT_STATUSES = new Set([
  'planned', 'live', 'observing_7d', 'observing_14d', 'won', 'lost', 'inconclusive',
]);
const FUNNEL_KEYS = [
  'cta_click', 'form_open', 'form_start', 'inquiry_prompt_select', 'form_submit',
  'generate_lead', 'form_error', 'form_abandon', 'contact_click',
];

const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isIsoDate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
const isIsoTime = (value) => typeof value === 'string' && Number.isFinite(Date.parse(value));
const nullableNumber = (value, name, { min = 0, max = Infinity } = {}) => {
  if (value === null) return;
  if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${name} must be null or a number in ${min}..${max}`);
};
const assertStatus = (value, name) => {
  if (!STATUSES.has(value)) throw new Error(`${name} has unsupported status`);
};

function validateGsc(value, name) {
  if (!isObject(value)) throw new Error(`${name} must be an object`);
  nullableNumber(value.clicks, `${name}.clicks`, { min: 0 });
  nullableNumber(value.impressions, `${name}.impressions`, { min: 0 });
  nullableNumber(value.ctr, `${name}.ctr`, { min: 0, max: 1 });
  nullableNumber(value.avg_position, `${name}.avg_position`, { min: 0 });
}

function validateGa4(value, name) {
  if (!isObject(value)) throw new Error(`${name} must be an object`);
  nullableNumber(value.organic_sessions, `${name}.organic_sessions`, { min: 0 });
}

function validateFunnel(value, name) {
  if (!isObject(value)) throw new Error(`${name} must be an object`);
  for (const key of FUNNEL_KEYS) nullableNumber(value[key] ?? null, `${name}.${key}`, { min: 0 });
}

export function validateSeoSummary(snapshot) {
  if (!isObject(snapshot)) throw new Error('snapshot must be an object');
  if (snapshot.schema_version !== SCHEMA_VERSION) throw new Error(`schema_version must be ${SCHEMA_VERSION}`);
  if (snapshot.site !== 'wonlyglobal.com') throw new Error('site must be wonlyglobal.com');
  if (!isIsoTime(snapshot.generated_at)) throw new Error('generated_at must be ISO-8601');

  if (!isObject(snapshot.freshness)) throw new Error('freshness must be an object');
  for (const provider of ['ga4', 'gsc', 'semrush']) {
    const item = snapshot.freshness[provider];
    if (!isObject(item)) throw new Error(`freshness.${provider} must be an object`);
    if (item.through !== null && !isIsoDate(item.through)) throw new Error(`freshness.${provider}.through must be YYYY-MM-DD or null`);
    if (provider !== 'semrush') nullableNumber(item.lag_days, `freshness.${provider}.lag_days`, { min: 0 });
    assertStatus(item.status, `freshness.${provider}`);
  }

  if (!isObject(snapshot.windows)) throw new Error('windows must be an object');
  for (const window of ['7d', '28d']) {
    const item = snapshot.windows[window];
    if (!isObject(item)) throw new Error(`windows.${window} must be an object`);
    validateGsc(item.gsc, `windows.${window}.gsc`);
    validateGa4(item.ga4, `windows.${window}.ga4`);
  }

  if (!Array.isArray(snapshot.markets)) throw new Error('markets must be an array');
  for (const [index, market] of snapshot.markets.entries()) {
    if (!isObject(market) || !/^[A-Z]{2}$/.test(market.country || '')) throw new Error(`markets.${index}.country must be ISO alpha-2`);
    assertStatus(market.status, `markets.${index}`);
  }

  if (!isObject(snapshot.funnel)) throw new Error('funnel must be an object');
  for (const name of ['organic_7d', 'organic_28d', 'all_channels_7d', 'all_channels_28d']) {
    validateFunnel(snapshot.funnel[name], `funnel.${name}`);
  }

  if (!Array.isArray(snapshot.pages)) throw new Error('pages must be an array');
  for (const [index, page] of snapshot.pages.entries()) {
    if (!isObject(page) || typeof page.path !== 'string' || !page.path.startsWith('/')) throw new Error(`pages.${index}.path must be site-relative`);
    if (!['commercial', 'article'].includes(page.role)) throw new Error(`pages.${index}.role is unsupported`);
    if (!Array.isArray(page.issues)) throw new Error(`pages.${index}.issues must be an array`);
  }

  if (!Array.isArray(snapshot.experiments)) throw new Error('experiments must be an array');
  for (const [index, experiment] of snapshot.experiments.entries()) {
    if (!isObject(experiment) || typeof experiment.id !== 'string' || !experiment.id) throw new Error(`experiments.${index}.id is required`);
    if (!EXPERIMENT_STATUSES.has(experiment.status)) throw new Error(`experiments.${index}.status is unsupported`);
    if (!isObject(experiment.baseline)) throw new Error(`experiments.${index}.baseline must be an object`);
  }

  if (!Array.isArray(snapshot.competitors) || !Array.isArray(snapshot.gaps) || !Array.isArray(snapshot.sources)) {
    throw new Error('competitors, gaps and sources must be arrays');
  }
  return snapshot;
}

export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (isObject(value)) return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

export function sha256Base64Url(value = '') {
  return createHash('sha256').update(value).digest('base64url');
}

export function canonicalRequest({ method, pathname, search = '', timestamp, nonce, body = '' }) {
  return [method.toUpperCase(), `${pathname}${search}`, String(timestamp), nonce, sha256Base64Url(body)].join('\n');
}

export function signRequest(request, secret) {
  return createHmac('sha256', secret).update(canonicalRequest(request)).digest('base64url');
}

export function verifySignature(signature, expected) {
  try {
    const a = Buffer.from(signature, 'base64url');
    const b = Buffer.from(expected, 'base64url');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function atomicJsonWrite(file, value) {
  const serialized = `${JSON.stringify(value, null, 2)}\n`;
  if (Buffer.byteLength(serialized) > MAX_INPUT_BYTES) throw new Error('snapshot exceeds maximum input size');
  await mkdir(path.dirname(file), { recursive: true, mode: 0o750 });
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temp, serialized, { mode: 0o640 });
  await rename(temp, file);
}

export async function readSnapshot(file) {
  const raw = await readFile(file, 'utf8');
  if (Buffer.byteLength(raw) > MAX_INPUT_BYTES) throw new Error('snapshot file exceeds maximum size');
  return validateSeoSummary(JSON.parse(raw));
}

export async function writeSnapshot(storeDir, snapshot) {
  validateSeoSummary(snapshot);
  const generatedDate = snapshot.generated_at.slice(0, 10);
  const historyFile = path.join(storeDir, 'history', `${generatedDate}.json`);
  let existing = null;
  try { existing = await readSnapshot(historyFile); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (existing && Date.parse(existing.generated_at) > Date.parse(snapshot.generated_at)) {
    throw new Error('an older snapshot cannot replace the generated-date history entry');
  }
  await atomicJsonWrite(historyFile, snapshot);

  const currentFile = path.join(storeDir, 'current.json');
  let current = null;
  try { current = await readSnapshot(currentFile); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (!current || Date.parse(snapshot.generated_at) >= Date.parse(current.generated_at)) {
    await atomicJsonWrite(currentFile, snapshot);
  }
  return { generatedDate, historyFile, currentFile };
}
