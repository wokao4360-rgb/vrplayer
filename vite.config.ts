import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Keep explicit chunk ownership, avoid pulling shared core deps into optional chunks.
        // This prevents optional feature chunks from becoming entry static dependencies.
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          if (id.includes('three/examples/jsm/')) {
            return 'three-extras';
          }
          if (id.includes('/node_modules/three/')) {
            return 'three-core';
          }
          if (
            id.includes('/src/ui/ConfigStudio') ||
            id.includes('/src/ui/DebugPanel') ||
            id.includes('/src/ui/NorthCalibrationPanel')
          ) {
            return 'editor-debug';
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
























