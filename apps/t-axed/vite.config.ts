import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@antigravity/tax-engine': path.resolve(__dirname, '../../packages/tax-engine/src/index.ts'),
      '@antigravity/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@antigravity/tokens': path.resolve(__dirname, '../../packages/tokens/src/index.ts'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'T-Axed: Nigeria Tax Clarity',
        short_name: 'T-Axed',
        description: 'Nigerian Tax Transparency & Clarity Tool',
        theme_color: '#FF5A5F',
        icons: [
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
