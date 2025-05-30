import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acesso pela rede local (iPhone, outros dispositivos)
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
