import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('CubeCanvasPano imports MathUtils when using yaw/pitch helpers', () => {
  const filePath = path.resolve('src/viewer/CubeCanvasPano.ts');
  const source = fs.readFileSync(filePath, 'utf8');

  assert.match(source, /import\s*\{[\s\S]*\bMathUtils\b[\s\S]*\}\s*from '\.\.\/vendor\/three-core\.ts';/);
  assert.match(source, /\bMathUtils\.radToDeg\b/);
});
