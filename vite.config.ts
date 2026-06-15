import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'node:os'
import { execSync } from 'node:child_process'

const PORT = 5173

// Last git commit time (ISO) — a proxy for "last push", shown on the flow picker.
// Falls back to build time if git isn't available (e.g. some CI environments).
function getLastCommitTime(): string {
  try {
    return execSync('git log -1 --format=%cI').toString().trim()
  } catch {
    return new Date().toISOString()
  }
}

// Find the machine's LAN IPv4 so the QR / network URL is ready without typing.
function getLanUrl(): string {
  const nets = os.networkInterfaces()
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      // Skip internal (127.0.0.1) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return `http://${net.address}:${PORT}`
      }
    }
  }
  return ''
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Injected at dev/build time — consumed by DevBanner for the auto QR
    __NETWORK_URL__: JSON.stringify(getLanUrl()),
    // Last git commit time — shown as the "last updated" stamp on the flow picker
    __BUILD_TIME__: JSON.stringify(getLastCommitTime()),
  },
  server: {
    host: true,   // ← Exposes to LAN — required for mobile device testing
    port: PORT,
    open: false,  // Terminal will show the Network URL to share
  },
  preview: {
    host: true,
    port: 4173,
  },
})
