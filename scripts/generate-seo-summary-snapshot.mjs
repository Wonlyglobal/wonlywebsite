import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { writeSnapshot } from './lib/seo-summary.mjs';

const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
};
const input = valueAfter('--input');
const storeDir = valueAfter('--store') || process.env.SEO_SUMMARY_STORE_DIR;

if (!input || !storeDir) {
  console.error('Usage: node scripts/generate-seo-summary-snapshot.mjs --input <sanitized.json> --store <directory>');
  process.exit(2);
}

try {
  const snapshot = JSON.parse(await readFile(path.resolve(input), 'utf8'));
  const result = await writeSnapshot(path.resolve(storeDir), snapshot);
  console.log(JSON.stringify({ ok: true, generated_date: result.generatedDate }));
} catch (error) {
  console.error(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : 'snapshot_generation_failed' }));
  process.exit(1);
}
