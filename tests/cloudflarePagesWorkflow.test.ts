import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflowSource = readFileSync(
  new URL('../.github/workflows/cloudflare-pages-deploy.yml', import.meta.url),
  'utf8',
);

test('cloudflare pages workflow deploys preview branches as well as main', () => {
  assert.match(workflowSource, /- main/);
  assert.match(workflowSource, /- codex\/\*\*/);
  assert.match(workflowSource, /--branch=\$\{\{\s*github\.ref_name\s*\}\}/);
});

test('cloudflare pages workflow isolates concurrency by git branch', () => {
  assert.match(workflowSource, /group:\s*cloudflare-pages-\$\{\{\s*github\.ref_name\s*\}\}/);
});
