import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { signRequest, writeSnapshot } from './lib/seo-summary.mjs';

const root = path.resolve(import.meta.dirname, '..');
const sample = JSON.parse(await readFile(path.join(root, 'docs/examples/seo-summary-current.sample.json'), 'utf8'));
const store = await mkdtemp(path.join(tmpdir(), 'wonly-seo-summary-'));
await writeSnapshot(store, sample);

const port = 18796;
const keyId = 'crm-grace-test';
const secret = 'test-only-secret-with-at-least-32-bytes';
const child = spawn(process.execPath, ['scripts/run-seo-summary-api.mjs'], {
  cwd: root,
  env: { ...process.env, PORT: String(port), SEO_SUMMARY_STORE_DIR: store, SEO_SUMMARY_CLIENTS_JSON: JSON.stringify({ [keyId]: secret }) },
  stdio: ['ignore', 'pipe', 'pipe'],
});

async function request(pathname, { timestamp = Math.floor(Date.now() / 1000), nonce = `nonce_${crypto.randomUUID().replaceAll('-', '')}` } = {}) {
  const url = new URL(`http://127.0.0.1:${port}${pathname}`);
  const signature = signRequest({ method: 'GET', pathname: url.pathname, search: url.search, timestamp, nonce, body: '' }, secret);
  return fetch(url, { headers: { 'X-Wonly-Key-Id': keyId, 'X-Wonly-Timestamp': String(timestamp), 'X-Wonly-Nonce': nonce, 'X-Wonly-Signature': signature } });
}

try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { await fetch(`http://127.0.0.1:${port}/ready`); break; } catch { await delay(50); }
  }
  const current = await request('/seo-summary/v1/current');
  assert.equal(current.status, 200);
  const currentBody = await current.json();
  assert.equal(currentBody.schema_version, '1.0');
  assert.ok(currentBody.windows['7d'].gsc.ctr >= 0 && currentBody.windows['7d'].gsc.ctr <= 1);

  const history = await request('/seo-summary/v1/history?days=14');
  assert.equal(history.status, 200);
  assert.equal((await history.json()).snapshots.length, 1);

  const badDays = await request('/seo-summary/v1/history?days=91');
  assert.equal(badDays.status, 400);

  const missing = await request('/seo-summary/v1/missing');
  assert.equal(missing.status, 404);

  const replayNonce = `nonce_${crypto.randomUUID().replaceAll('-', '')}`;
  assert.equal((await request('/seo-summary/v1/current', { nonce: replayNonce })).status, 200);
  assert.equal((await request('/seo-summary/v1/current', { nonce: replayNonce })).status, 401);

  const stale = await request('/seo-summary/v1/current', { timestamp: Math.floor(Date.now() / 1000) - 301 });
  assert.equal(stale.status, 401);

  const unsigned = await fetch(`http://127.0.0.1:${port}/seo-summary/v1/current`);
  assert.equal(unsigned.status, 401);
  console.log('seo-summary-api tests passed');
} finally {
  child.kill('SIGTERM');
}
