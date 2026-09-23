import history from '../data/history.json' with { type: 'json' };
import { authorize, reply } from '../lib/auth.mjs';

export default function handler(request, response) {
  if (request.method !== 'GET') return reply(response, 405, { error: 'method_not_allowed' });
  if (!authorize(request, '/seo-summary/v1/history')) return reply(response, 401, { error: 'unauthorized' });
  const days = request.query?.days === undefined ? 14 : Number(request.query.days);
  if (!Number.isInteger(days) || days < 1 || days > 90) return reply(response, 400, { error: 'invalid_days' });
  return reply(response, 200, { schema_version: '1.0', site: 'wonlyglobal.com', snapshots: history.snapshots.slice(-days) });
}
