import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/ai-printing/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ai-printing',
        short_name: 'ai-printing',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ],
        start_url: '/ai-printing/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#111827'
      }
    })
  ]
});
