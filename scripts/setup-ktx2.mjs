#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.resolve('node_modules/three/examples/jsm/libs/basis');
const outDir = path.resolve('public/assets/basis');

const files = ['basis_transcoder.js', 'basis_transcoder.wasm'];

if (!fs.existsSync(srcDir)) {
  console.error(`[ktx2] three.js basis libs not found: ${srcDir}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
for (const file of files) {
  const src = path.join(srcDir, file);
  const dst = path.join(outDir, file);
  if (!fs.existsSync(src)) {
    console.error(`[ktx2] missing file: ${src}`);
    process.exit(1);
  }
  fs.copyFileSync(src, dst);
  console.log(`[ktx2] copied ${file} -> ${path.relative(process.cwd(), dst)}`);
}
