import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    svgr(),
    process.env.ANALYZE === '1' && visualizer({ open: true, gzipSize: true }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;

          const isReactCore =
            /node_modules[\\/]+react(?!-)/.test(id) ||
            /node_modules[\\/]+react-dom(?!-)/.test(id);
          const isReactDependent =
            id.includes('node_modules/react-i18next') ||
            id.includes('node_modules/react-hook-form') ||
            id.includes('node_modules/@hookform') ||
            id.includes('node_modules/react-phone-number-input') ||
            id.includes('node_modules/@tanstack') ||
            id.includes('node_modules/react-error-boundary') ||
            id.includes('node_modules/react-hot-toast') ||
            id.includes('node_modules/openapi-react-query');
          if (isReactCore || isReactDependent) return 'vendor-react';

          if (
            id.includes('node_modules/motion') ||
            id.includes('node_modules/framer-motion')
          )
            return 'vendor-motion';
          if (id.includes('node_modules/lucide-react')) return 'vendor-lucide';

          if (id.includes('node_modules/i18next')) return 'vendor-i18n';
          if (
            id.includes('node_modules/@amplitude') ||
            id.includes('node_modules/amplitude')
          )
            return 'vendor-amplitude';
          if (id.includes('node_modules/zod')) return 'vendor-zod';
          if (
            id.includes('node_modules/libphonenumber') ||
            id.includes('node_modules/libphonenumber-js')
          )
            return 'vendor-phone';
        },
      },
    },
  },
});
