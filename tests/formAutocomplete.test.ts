import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const loginModalSource = readFileSync(
  new URL('../src/ui/community/LoginModal.tsx', import.meta.url),
  'utf8',
);
const communityPanelSource = readFileSync(
  new URL('../src/ui/community/CommunityPanel.tsx', import.meta.url),
  'utf8',
);
const fcChatSource = readFileSync(
  new URL('../src/ui/FcChatPanel.ts', import.meta.url),
  'utf8',
);

test('mobile text inputs declare autocomplete hints instead of relying on browser defaults', () => {
  assert.ok(
    loginModalSource.includes("this.inputEl.autocomplete = 'nickname';"),
    'login username input should declare nickname autocomplete',
  );
  assert.ok(
    communityPanelSource.includes("this.inputEl.autocomplete = 'off';"),
    'community comment input should explicitly disable autocomplete',
  );
  assert.ok(
    fcChatSource.includes('this.input.autocomplete = "off";'),
    'companion prompt input should explicitly disable autocomplete',
  );
});
