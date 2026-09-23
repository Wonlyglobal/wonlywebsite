import { createSign } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { writeSnapshot } from './lib/seo-summary.mjs';

const credentials = process.env.GOOGLE_SA_KEY;
const property = process.env.GA4_PROPERTY_ID;
const site = process.env.GSC_SITE || 'sc-domain:wonlyglobal.com';
const storeDir = process.env.SEO_SUMMARY_STORE_DIR;
const host = 'https://www.wonlyglobal.com';
if (!credentials || !property || !storeDir) throw new Error('GOOGLE_SA_KEY, GA4_PROPERTY_ID and SEO_SUMMARY_STORE_DIR are required');

const serviceAccount = JSON.parse(credentials);
const scopes = ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/webmasters.readonly'];
const b64url = (value) => Buffer.from(value).toString('base64url');
let cachedToken;
let cachedTokenExpiresAt = 0;
const token = async () => {
  if (cachedToken && Date.now() < cachedTokenExpiresAt - 60_000) return cachedToken;
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: scopes.join(' '),
    aud: serviceAccount.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(serviceAccount.private_key).toString('base64url')}`;
  const response = await fetch(serviceAccount.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`google_oauth_${response.status}`);
  const payload = await response.json();
  if (typeof payload.access_token !== 'string') throw new Error('google_oauth_invalid_response');
  cachedToken = payload.access_token;
  cachedTokenExpiresAt = Date.now() + Number(payload.expires_in || 3600) * 1000;
  return cachedToken;
};
const iso = (date) => date.toISOString().slice(0, 10);
const ago = (days) => { const date = new Date(); date.setUTCDate(date.getUTCDate() - days); return date; };
const number = (value) => Number(value || 0);

async function google(url, body) {
  const response = await fetch(url, { method: 'POST', headers: { authorization: `Bearer ${await token()}`, 'content-type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`google_${response.status}`);
  return response.json();
}

const gscUrl = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
const gaUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`;
const organic = { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { value: 'Organic Search' } } };
const events = ['cta_click', 'form_open', 'form_start', 'inquiry_prompt_select', 'form_submit', 'generate_lead', 'form_error', 'form_abandon', 'contact_click'];
const eventFilter = { filter: { fieldName: 'eventName', inListFilter: { values: events } } };
const counts = (report) => Object.fromEntries(events.map((event) => [event, number((report.rows || []).find((row) => row.dimensionValues?.[0]?.value === event)?.metricValues?.[0]?.value)]));
const gscMetrics = (row) => ({
  clicks: number(row?.clicks),
  impressions: number(row?.impressions),
  ctr: number(row?.ctr),
  avg_position: row && number(row.impressions) > 0 ? number(row.position) : null,
});

async function gscWindow(startDate, endDate, dimensions, filters) {
  const body = { startDate, endDate, rowLimit: dimensions ? 1000 : 1 };
  if (dimensions) body.dimensions = dimensions;
  if (filters) body.dimensionFilterGroups = [{ filters }];
  return google(gscUrl, body);
}

async function gaReport(startDate, endDate, { dimensions = [], metrics = [{ name: 'sessions' }], dimensionFilter } = {}) {
  const body = { dateRanges: [{ startDate, endDate }], metrics };
  if (dimensions.length) body.dimensions = dimensions;
  if (dimensionFilter) body.dimensionFilter = dimensionFilter;
  return google(gaUrl, body);
}

async function auditPage(pagePath) {
  const issues = [];
  try {
    const response = await fetch(new URL(pagePath, host), { redirect: 'manual', signal: AbortSignal.timeout(15_000), headers: { 'user-agent': 'WONLY-SEO-Summary/1.0' } });
    const html = await response.text();
    if (response.status !== 200) issues.push({ code: 'HTTP_STATUS', severity: 'P1', evidence: `HTTP ${response.status}`, detected_at: new Date().toISOString() });
    if (!/<title>[^<]{5,}<\/title>/i.test(html)) issues.push({ code: 'TITLE_MISSING', severity: 'P1', evidence: 'Static HTML title missing', detected_at: new Date().toISOString() });
    if (!/<link[^>]+rel=["']canonical["'][^>]+href=/i.test(html)) issues.push({ code: 'CANONICAL_MISSING', severity: 'P1', evidence: 'Static HTML canonical missing', detected_at: new Date().toISOString() });
    if (!/<h1(?:\s|>)/i.test(html)) issues.push({ code: 'H1_MISSING', severity: 'P2', evidence: 'Static HTML H1 missing', detected_at: new Date().toISOString() });
  } catch {
    issues.push({ code: 'AUDIT_UNAVAILABLE', severity: 'P1', evidence: 'Production audit request failed', detected_at: new Date().toISOString() });
  }
  return issues;
}

const generatedAt = new Date().toISOString();
const gscEnd = iso(ago(3)), gsc7Start = iso(ago(9)), gsc28Start = iso(ago(30));
const gaEnd = iso(ago(1)), ga7Start = iso(ago(7)), ga28Start = iso(ago(28));
const targetPages = [
  ['/insights/door-lock-core-vs-cylinder/', 'article'],
  ['/insights/en-1627-rc2-vs-rc3-vs-rc4-security-doors/', 'article'],
  ['/security-door-manufacturer/', 'commercial'],
  ['/security-doors-mexico/', 'commercial'],
  ['/es/puertas-de-seguridad-mexico/', 'commercial'],
];

const [gsc7, gsc28, gscPages7, gscPages28, gscCountries7, gaSessions7, gaSessions28, gaCountries7, all7, all28, organic7, organic28, experiments] = await Promise.all([
  gscWindow(gsc7Start, gscEnd), gscWindow(gsc28Start, gscEnd),
  gscWindow(gsc7Start, gscEnd, ['page']), gscWindow(gsc28Start, gscEnd, ['page']),
  gscWindow(gsc7Start, gscEnd, ['country']),
  gaReport(ga7Start, gaEnd, { dimensionFilter: organic }), gaReport(ga28Start, gaEnd, { dimensionFilter: organic }),
  gaReport(ga7Start, gaEnd, { dimensions: [{ name: 'country' }], dimensionFilter: organic }),
  gaReport(ga7Start, gaEnd, { dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: eventFilter }),
  gaReport(ga28Start, gaEnd, { dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: eventFilter }),
  gaReport(ga7Start, gaEnd, { dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: { andGroup: { expressions: [organic, eventFilter] } } }),
  gaReport(ga28Start, gaEnd, { dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: { andGroup: { expressions: [organic, eventFilter] } } }),
  readFile(new URL('./seo-summary-experiments.json', import.meta.url), 'utf8').then(JSON.parse),
]);

const gscPage = (report, pagePath) => gscMetrics((report.rows || []).find((row) => row.keys?.[0] === new URL(pagePath, host).href));
const countryGsc = (code) => gscMetrics((gscCountries7.rows || []).find((row) => row.keys?.[0] === code));
const countryGa = (name) => ({ organic_sessions: number((gaCountries7.rows || []).find((row) => row.dimensionValues?.[0]?.value === name)?.metricValues?.[0]?.value) });
const pages = await Promise.all(targetPages.map(async ([pagePath, role]) => ({ path: pagePath, role, gsc_7d: gscPage(gscPages7, pagePath), gsc_28d: gscPage(gscPages28, pagePath), issues: await auditPage(pagePath) })));
for (const experiment of experiments) {
  const page = pages.find((item) => experiment.target_paths.includes(item.path));
  experiment.latest = page ? { window: '7d', ...page.gsc_7d } : {};
}

const snapshot = {
  schema_version: '1.0', site: 'wonlyglobal.com', generated_at: generatedAt,
  freshness: {
    ga4: { through: gaEnd, lag_days: 1, status: 'ok' },
    gsc: { through: gscEnd, lag_days: 3, status: 'ok' },
    semrush: { through: '2026-09-07', status: 'stale' },
  },
  windows: {
    '7d': { gsc: gscMetrics(gsc7.rows?.[0]), ga4: { organic_sessions: number(gaSessions7.rows?.[0]?.metricValues?.[0]?.value) } },
    '28d': { gsc: gscMetrics(gsc28.rows?.[0]), ga4: { organic_sessions: number(gaSessions28.rows?.[0]?.metricValues?.[0]?.value) } },
  },
  markets: [
    { country: 'ES', gsc_7d: countryGsc('esp'), ga4_7d: countryGa('Spain'), status: 'ok' },
    { country: 'MX', gsc_7d: countryGsc('mex'), ga4_7d: countryGa('Mexico'), status: 'ok' },
  ],
  funnel: { organic_7d: counts(organic7), organic_28d: counts(organic28), all_channels_7d: counts(all7), all_channels_28d: counts(all28) },
  pages, experiments,
  competitors: ['hormann.com', 'dierre.com', 'oikos.it', 'kaadas.com', 'cdfdistributors.com'],
  gaps: [{ field: 'freshness.semrush', reason: 'data_lag', since: '2026-09-07T00:00:00Z' }],
  sources: [
    { name: 'GA4', captured_at: generatedAt, through: gaEnd, status: 'ok' },
    { name: 'GSC', captured_at: generatedAt, through: gscEnd, status: 'ok' },
    { name: 'SEMrush', captured_at: generatedAt, through: '2026-09-07', status: 'stale' },
    { name: 'production_audit', captured_at: generatedAt, through: iso(new Date()), status: pages.some((page) => page.issues.some((issue) => issue.code === 'AUDIT_UNAVAILABLE')) ? 'partial' : 'ok' },
  ],
};

const result = await writeSnapshot(path.resolve(storeDir), snapshot);
console.log(JSON.stringify({ ok: true, generated_date: result.generatedDate, generated_at: generatedAt }));
