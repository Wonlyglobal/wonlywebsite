import http from 'node:http';
import path from 'node:path';
import { readdir } from 'node:fs/promises';
import {
  MAX_CURRENT_BYTES, MAX_HISTORY_BYTES, MAX_HISTORY_DAYS, SIGNATURE_MAX_SKEW_SECONDS,
  readSnapshot, signRequest, stableJson, verifySignature,
} from './lib/seo-summary.mjs';

const port = Number(process.env.PORT || 8796);
const storeDir = process.env.SEO_SUMMARY_STORE_DIR;
let clients;
try { clients = JSON.parse(process.env.SEO_SUMMARY_CLIENTS_JSON || '{}'); } catch { clients = null; }
if (!storeDir || !clients || !Object.keys(clients).length) throw new Error('SEO_SUMMARY_STORE_DIR and SEO_SUMMARY_CLIENTS_JSON are required');

const usedNonces = new Map();
const json = (res, status, body, maxBytes = MAX_CURRENT_BYTES) => {
  const payload = stableJson(body);
  if (Buffer.byteLength(payload) > maxBytes) {
    res.writeHead(413, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    return res.end('{"error":{"code":"response_too_large"}}');
  }
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'private, max-age=60', vary: 'authorization' });
  return res.end(payload);
};

function authenticate(req, url) {
  const keyId = req.headers['x-wonly-key-id'];
  const timestamp = Number(req.headers['x-wonly-timestamp']);
  const nonce = req.headers['x-wonly-nonce'];
  const signature = req.headers['x-wonly-signature'];
  if (typeof keyId !== 'string' || typeof nonce !== 'string' || typeof signature !== 'string' || !Number.isInteger(timestamp)) return false;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(nonce)) return false;
  const secret = clients[keyId];
  if (typeof secret !== 'string' || secret.length < 32) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > SIGNATURE_MAX_SKEW_SECONDS) return false;
  for (const [stored, expiresAt] of usedNonces) if (expiresAt <= now) usedNonces.delete(stored);
  const nonceKey = `${keyId}:${nonce}`;
  if (usedNonces.has(nonceKey)) return false;
  const expected = signRequest({ method: req.method, pathname: url.pathname, search: url.search, timestamp, nonce, body: '' }, secret);
  if (!verifySignature(signature, expected)) return false;
  usedNonces.set(nonceKey, now + SIGNATURE_MAX_SKEW_SECONDS);
  return true;
}

async function history(days) {
  const dir = path.join(storeDir, 'history');
  let names;
  try { names = await readdir(dir); } catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const selected = names.filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name)).sort().reverse().slice(0, days);
  return Promise.all(selected.map((name) => readSnapshot(path.join(dir, name))));
}

http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  if (req.method !== 'GET') return json(res, 405, { error: { code: 'method_not_allowed' } });
  if (!authenticate(req, url)) return json(res, 401, { error: { code: 'invalid_signature' } });
  try {
    if (url.pathname === '/seo-summary/v1/current') {
      if (url.search) return json(res, 400, { error: { code: 'invalid_query' } });
      const snapshot = await readSnapshot(path.join(storeDir, 'current.json'));
      return json(res, 200, snapshot, MAX_CURRENT_BYTES);
    }
    if (url.pathname === '/seo-summary/v1/history') {
      if ([...url.searchParams.keys()].some((key) => key !== 'days')) return json(res, 400, { error: { code: 'invalid_query' } });
      const days = Number(url.searchParams.get('days') || 14);
      if (!Number.isInteger(days) || days < 1 || days > MAX_HISTORY_DAYS) return json(res, 400, { error: { code: 'invalid_days' } });
      return json(res, 200, { schema_version: '1.0', site: 'wonlyglobal.com', days, snapshots: await history(days) }, MAX_HISTORY_BYTES);
    }
    return json(res, 404, { error: { code: 'not_found' } });
  } catch (error) {
    if (error.code === 'ENOENT') return json(res, 503, { error: { code: 'snapshot_unavailable' } });
    console.error('seo_summary_api_error', error instanceof Error ? error.message : 'unknown');
    return json(res, 500, { error: { code: 'internal_error' } });
  }
}).listen(port, '127.0.0.1', () => console.log(`SEO summary API listening on ${port}`));
