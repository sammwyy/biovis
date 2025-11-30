import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.USE_PATH_PREFIX === 'true' ? '/biovis/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});
