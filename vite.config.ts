import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    lib: {
      entry: resolve(rootDir, 'src/index.ts'),
      name: 'OtterComponents',
      fileName: 'otter-components',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM', 'react/jsx-runtime': 'jsxRuntime' },
      },
    },
  },
});
