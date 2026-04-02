import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
    port: 3000,

    watch: {
      usePolling: true,
    },
  },
  base: "/zzz-card-banner",
})
