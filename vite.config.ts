import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  server: {
    // Take whatever port the harness assigns, so this dev server can coexist
    // with others. Falls back to Vite's default when PORT is not set.
    port: Number(process.env.PORT) || 5173,
    // Fail loudly rather than drifting to the next free port. The
    // desktop shortcut and the browser both assume 5173 is the full portfolio;
    // a server that quietly moved to 5175 would open the wrong thing.
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
