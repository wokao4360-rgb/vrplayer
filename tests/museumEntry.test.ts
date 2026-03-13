import test from 'node:test';
import assert from 'node:assert/strict';

import { getMuseumEntrySceneId } from '../src/utils/museumEntry.ts';

test('getMuseumEntrySceneId returns the first scene id for direct museum entry', () => {
  const museum = {
    scenes: [
      { id: 'south_gate', name: '南门' },
      { id: 'hall_1', name: '展厅 1' },
    ],
  };

  assert.equal(getMuseumEntrySceneId(museum), 'south_gate');
});

test('getMuseumEntrySceneId returns null when the museum has no scenes', () => {
  assert.equal(getMuseumEntrySceneId({ scenes: [] }), null);
});
