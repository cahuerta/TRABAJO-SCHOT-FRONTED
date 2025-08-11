import { defineConfig } from 'vite'

// Sin @vitejs/plugin-react. Compila JSX con esbuild (modo automático).
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  build: { outDir: 'dist' }
})
