// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║  Illustrations — pure inline SVG (no asset files).                         ║
// ║  Used as the visual fill / fallback for photo slots so the prototype       ║
// ║  looks complete with zero static assets. If a real photo is later          ║
// ║  supplied (VITE_ASSET_BASE_URL / public files), AssetImg shows it instead. ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import Box from '@mui/material/Box'

type ProductKind = 'sme' | 'housing' | 'agri' | 'shop'

const fill = (sx?: object) => ({
  width: '100%',
  height: '100%',
  display: 'block',
  ...sx,
})

// ── Popular Loan Product scenes (≈160×120, slice-fit) ────────────────────────
export function ProductScene({ kind }: { kind: ProductKind }) {
  if (kind === 'housing') {
    return (
      <Box component="svg" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" sx={fill()}>
        <defs>
          <linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7FB2FF" />
            <stop offset="1" stopColor="#2D6FD6" />
          </linearGradient>
        </defs>
        <rect width="160" height="120" fill="url(#hsky)" />
        <circle cx="130" cy="26" r="14" fill="#FFE08A" opacity="0.95" />
        <rect x="0" y="92" width="160" height="28" fill="#3DA35D" />
        <rect x="0" y="92" width="160" height="6" fill="#46B468" />
        {/* house */}
        <rect x="46" y="58" width="68" height="40" fill="#FFFFFF" rx="2" />
        <polygon points="42,58 80,32 118,58" fill="#E8567A" />
        <rect x="56" y="70" width="16" height="16" fill="#9CC4FF" rx="1" />
        <rect x="88" y="70" width="16" height="28" fill="#2D6FD6" rx="1" />
      </Box>
    )
  }
  if (kind === 'agri') {
    return (
      <Box component="svg" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" sx={fill()}>
        <defs>
          <linearGradient id="afield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9BE7B4" />
            <stop offset="1" stopColor="#1E8A44" />
          </linearGradient>
        </defs>
        <rect width="160" height="120" fill="url(#afield)" />
        <circle cx="30" cy="28" r="13" fill="#FFE08A" opacity="0.95" />
        <path d="M0 96 Q80 78 160 96 L160 120 L0 120 Z" fill="#7A5230" />
        <path d="M0 104 Q80 90 160 104 L160 120 L0 120 Z" fill="#8C6239" />
        {/* sprout */}
        <path d="M80 98 C80 80 80 70 80 62" stroke="#2E7D32" strokeWidth="4" fill="none" />
        <path d="M80 76 C66 74 58 64 58 54 C72 54 80 64 80 76 Z" fill="#43A047" />
        <path d="M80 70 C94 68 102 58 102 48 C88 48 80 58 80 70 Z" fill="#5CB85C" />
      </Box>
    )
  }
  if (kind === 'shop') {
    return (
      <Box component="svg" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" sx={fill()}>
        <defs>
          <linearGradient id="oshop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFC074" />
            <stop offset="1" stopColor="#F2790B" />
          </linearGradient>
        </defs>
        <rect width="160" height="120" fill="url(#oshop)" />
        <circle cx="34" cy="30" r="20" fill="#FFFFFF" opacity="0.16" />
        {/* boxes */}
        <rect x="30" y="74" width="34" height="28" fill="#C97A2B" rx="2" />
        <rect x="30" y="74" width="34" height="10" fill="#E69447" rx="2" />
        {/* shopping bag */}
        <rect x="74" y="56" width="48" height="46" fill="#FFFFFF" rx="4" />
        <path d="M86 56 a12 12 0 0 1 24 0" fill="none" stroke="#F2790B" strokeWidth="4" />
        <circle cx="98" cy="78" r="9" fill="#FFB55A" />
        <path d="M98 73 v10 M94 76 h8" stroke="#F2790B" strokeWidth="2.5" strokeLinecap="round" />
      </Box>
    )
  }
  // sme / business (default)
  return (
    <Box component="svg" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" sx={fill()}>
      <defs>
        <linearGradient id="sbiz" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5BA8FF" />
          <stop offset="1" stopColor="#0052CC" />
        </linearGradient>
      </defs>
      <rect width="160" height="120" fill="url(#sbiz)" />
      <circle cx="128" cy="30" r="22" fill="#FFFFFF" opacity="0.14" />
      {/* buildings */}
      <rect x="26" y="50" width="34" height="55" fill="#FFFFFF" opacity="0.92" rx="2" />
      <rect x="66" y="36" width="40" height="69" fill="#FFFFFF" rx="2" />
      {[42, 56, 70, 84].map((y) => (
        <g key={y}>
          <rect x="32" y={y} width="8" height="6" fill="#9CC4FF" />
          <rect x="46" y={y} width="8" height="6" fill="#9CC4FF" />
        </g>
      ))}
      {[46, 60, 74, 88].map((y) => (
        <g key={y}>
          <rect x="72" y={y} width="9" height="7" fill="#7FB2FF" />
          <rect x="86" y={y} width="9" height="7" fill="#7FB2FF" />
        </g>
      ))}
      {/* coin */}
      <circle cx="124" cy="80" r="17" fill="#FFD24D" />
      <circle cx="124" cy="80" r="17" fill="none" stroke="#F2B705" strokeWidth="2" />
      <path d="M124 70 v20 M118 75 h10 M118 85 h10" stroke="#A9750A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </Box>
  )
}

// ── Avatar (circular person silhouette) ──────────────────────────────────────
export function AvatarArt() {
  return (
    <Box component="svg" viewBox="0 0 64 64" sx={fill()}>
      <defs>
        <linearGradient id="av" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4D9BFF" />
          <stop offset="1" stopColor="#0052CC" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#av)" />
      <circle cx="32" cy="25" r="11" fill="#FFFFFF" opacity="0.95" />
      <path d="M14 56 c0-11 8-18 18-18 s18 7 18 18 Z" fill="#FFFFFF" opacity="0.95" />
    </Box>
  )
}

// ── Wide promo scene (news carousel; label is rendered on top by the caller) ─
export function PromoScene({ hue = 210 }: { hue?: number }) {
  return (
    <Box component="svg" viewBox="0 0 290 100" preserveAspectRatio="xMidYMid slice" sx={fill()}>
      <defs>
        <linearGradient id={`promo${hue}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 80% 55%)`} />
          <stop offset="1" stopColor={`hsl(${hue} 75% 35%)`} />
        </linearGradient>
      </defs>
      <rect width="290" height="100" fill={`url(#promo${hue})`} />
      <circle cx="250" cy="20" r="48" fill="#FFFFFF" opacity="0.10" />
      <circle cx="210" cy="86" r="30" fill="#FFFFFF" opacity="0.08" />
      {/* gift / promo tag motif on the right */}
      <g transform="translate(236 34)">
        <rect x="0" y="10" width="40" height="34" rx="4" fill="#FFFFFF" opacity="0.95" />
        <rect x="0" y="10" width="40" height="10" rx="2" fill="#FFD24D" />
        <rect x="17" y="10" width="6" height="34" fill="#E8567A" />
        <path d="M20 10 c-8 -10 -16 -2 0 0 c16 -2 8 -10 0 0" fill="#E8567A" />
      </g>
    </Box>
  )
}
