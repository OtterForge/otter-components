import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: 'preview',
  plugins: [react()],
  resolve: {
    alias: {
      '@otter/components': resolve(rootDir, 'src/index.ts'),
      '@src': resolve(rootDir, 'src'),
    },
  },
  build: { outDir: '../preview-dist', emptyOutDir: true },
});
