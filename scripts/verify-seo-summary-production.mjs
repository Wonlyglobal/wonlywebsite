import { signRequest } from './lib/seo-summary.mjs';

const clients = JSON.parse(process.env.SEO_SUMMARY_CLIENTS_JSON || '{}');
const [keyId, secret] = Object.entries(clients)[0] || [];
if (!keyId || !secret) throw new Error('SEO_SUMMARY_CLIENTS_JSON is required');
const path = '/seo-summary/v1/current';
const timestamp = Math.floor(Date.now() / 1000);
const nonce = `verify_${crypto.randomUUID().replaceAll('-', '')}`;
const signature = signRequest({ method: 'GET', pathname: path, search: '', timestamp, nonce, body: '' }, secret);
const headers = {
  'X-Wonly-Key-Id': keyId,
  'X-Wonly-Timestamp': String(timestamp),
  'X-Wonly-Nonce': nonce,
  'X-Wonly-Signature': signature,
};
const response = await fetch(`http://127.0.0.1:${process.env.PORT || 8796}${path}`, { headers });
if (!response.ok) throw new Error(`seo_summary_${response.status}`);
const payload = await response.json();
if (payload.schema_version !== '1.0' || payload.site !== 'wonlyglobal.com' || !payload.generated_at) throw new Error('invalid_snapshot');
console.log(JSON.stringify({ ok: true, site: payload.site, generated_at: payload.generated_at }));
