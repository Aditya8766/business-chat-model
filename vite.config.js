import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: {},
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  resolve: {
    alias: {
      // Use 'buffer' polyfill
      buffer: path.resolve(__dirname, 'node_modules/buffer/'),
    },
  },
});
