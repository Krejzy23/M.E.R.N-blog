import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',              // základní cesta pro Vercel
  plugins: [react()],
  build: {
    outDir: 'public',      // složka, kam se build uloží
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // tvůj backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
