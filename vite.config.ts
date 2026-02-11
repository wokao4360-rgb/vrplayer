import { defineConfig } from 'vite';

const optionalThreeImporterPrefixes = [
  '/src/ui/structure3d/',
  '/src/ui/StructureView3D',
  '/src/ui/Dollhouse3DPanel',
  '/src/viewer/dollhouseScene',
  '/src/viewer/dollhouseViewer',
  '/src/viewer/TileMeshPano',
  '/src/viewer/NadirPatch',
];

const coreThreeImporterPrefixes = [
  '/src/vendor/three-core',
  '/src/viewer/PanoViewer',
  '/src/viewer/TileCanvasPano',
  '/src/ui/Hotspots',
  '/src/viewer/createCompassTexture',
  '/src/viewer/spatialProjection',
  '/src/viewer/picking',
];

function collectSourceImporters(
  moduleId: string,
  getModuleInfo: (id: string) => { importers: string[]; dynamicImporters: string[] } | null,
): Set<string> {
  const owners = new Set<string>();
  const visited = new Set<string>();
  const queue = [moduleId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    const info = getModuleInfo(current);
    if (!info) continue;

    for (const importer of [...info.importers, ...info.dynamicImporters]) {
      if (importer.includes('/src/')) {
        owners.add(importer);
        continue;
      }
      if (!visited.has(importer)) {
        queue.push(importer);
      }
    }
  }

  return owners;
}

function isOptionalOnlyThreeModule(
  id: string,
  getModuleInfo: (id: string) => { importers: string[]; dynamicImporters: string[] } | null,
): boolean {
  if (!id.includes('/node_modules/three/')) return false;

  const owners = collectSourceImporters(id, getModuleInfo);
  if (owners.size === 0) return false;

  let hasOptional = false;
  let hasCore = false;
  let hasUnknown = false;

  for (const owner of owners) {
    if (optionalThreeImporterPrefixes.some((prefix) => owner.includes(prefix))) {
      hasOptional = true;
      continue;
    }
    if (coreThreeImporterPrefixes.some((prefix) => owner.includes(prefix))) {
      hasCore = true;
      continue;
    }
    hasUnknown = true;
  }

  return hasOptional && !hasCore && !hasUnknown;
}

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    modulePreload: {
      resolveDependencies: (_url, deps, { hostType }) => {
        if (hostType === 'html') {
          return deps.filter(
            (dep) =>
              !dep.includes('three-extras-') &&
              !dep.includes('three-optional-'),
          );
        }
        return deps;
      },
    },
    rollupOptions: {
      output: {
        // Keep explicit chunk ownership, avoid pulling shared core deps into optional chunks.
        // This prevents optional feature chunks from becoming entry static dependencies.
        onlyExplicitManualChunks: true,
        manualChunks(id, ctx) {
          if (
            id.includes('/src/app/sceneUiRuntime') ||
            id.includes('/src/app/chatRuntime')
          ) {
            return 'scene-runtime';
          }
          if (
            id.includes('/src/viewer/TileMeshPano') ||
            id.includes('three/examples/jsm/loaders/KTX2Loader')
          ) {
            return 'tile-ktx2';
          }
          if (id.includes('three/examples/jsm/')) {
            return 'three-extras';
          }
          if (isOptionalOnlyThreeModule(id, ctx.getModuleInfo)) {
            return 'three-optional';
          }
          if (id.includes('/src/vendor/three-core')) {
            return 'three-renderer';
          }
          if (id.includes('/node_modules/three/src/')) {
            return 'three-renderer';
          }
          if (
            id.includes('/src/ui/ConfigStudio') ||
            id.includes('/src/ui/DebugPanel') ||
            id.includes('/src/ui/NorthCalibrationPanel')
          ) {
            return 'editor-debug';
          }
          if (id.includes('/src/ui/structure3d/')) {
            return 'structure3d-runtime';
          }
          if (
            id.includes('/src/ui/DockPanels') ||
            id.includes('/src/ui/MapPanel') ||
            id.includes('/src/ui/Dollhouse3DPanel') ||
            id.includes('/src/ui/StructureView3D')
          ) {
            return 'dock-panels';
          }
          if (
            id.includes('/src/ui/FcChatPanel') ||
            id.includes('/src/services/fcChatClient') ||
            id.includes('/src/ui/community/')
          ) {
            return 'chat-community';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});













