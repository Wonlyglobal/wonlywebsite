import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const store = path.resolve('serverless/seo-summary/data');
const current = JSON.parse(await readFile(path.join(store, 'current.json'), 'utf8'));
const historyFile = path.join(store, 'history.json');
let history = { schema_version: '1.0', site: 'wonlyglobal.com', snapshots: [] };
try { history = JSON.parse(await readFile(historyFile, 'utf8')); } catch {}
const date = current.generated_at.slice(0, 10);
const snapshots = history.snapshots.filter((item) => item.generated_at.slice(0, 10) !== date);
snapshots.push(current);
snapshots.sort((a, b) => a.generated_at.localeCompare(b.generated_at));
history.snapshots = snapshots.slice(-90);
await writeFile(historyFile, `${JSON.stringify(history, null, 2)}\n`);
