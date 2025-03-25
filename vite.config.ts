import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
