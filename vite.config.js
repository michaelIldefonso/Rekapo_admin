import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const useTunnelHmr = env.VITE_USE_TUNNEL_HMR === 'true'

  return {
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: ['rekapo-admin.loca.lt'],
    // Only force secure HMR when running behind a tunnel.
    // For localhost development, let Vite auto-configure HMR (ws://localhost:3000).
    hmr: useTunnelHmr
      ? {
          clientPort: 443,
          protocol: 'wss'
        }
      : undefined
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: ['rekapo-admin.loca.lt', '.devtunnels.ms']
  }
}
})
