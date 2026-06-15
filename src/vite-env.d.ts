/// <reference types="vite/client" />

// LAN URL injected by vite.config.ts (e.g. "http://192.168.1.20:5173"); "" if undetected
declare const __NETWORK_URL__: string

// Last git commit time (ISO) at build, injected by vite.config.ts — proxy for "last push".
declare const __BUILD_TIME__: string

interface ImportMetaEnv {
  // Base URL for app assets. Unset → bundled /assets. Set to a CDN/asset-server
  // base to serve assets remotely (see src/components/home/media.tsx).
  readonly VITE_ASSET_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
