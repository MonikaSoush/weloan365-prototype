import Box from '@mui/material/Box'

// ISO-ish country codes for the flag SVGs.
export type FlagCode = 'gb' | 'kh' | 'kr' | 'jp' | 'sg'

// Source per code — the designed flags live in /assets/brand/Flags; jp/sg keep
// the legacy set until designed versions are dropped in.
const FLAG_SRC: Record<FlagCode, string> = {
  gb: '/assets/brand/Flags/United Kingdom.svg',
  kh: '/assets/brand/Flags/Cambodia.svg',
  kr: '/assets/brand/Flags/South Korea.svg',
  jp: '/assets/flags/jp.svg',
  sg: '/assets/flags/sg.svg',
}

// Designed flags are already circular 24×24 SVG badges with a built-in border ring.
// Legacy flags (jp, sg) are rectangular and need a circular wrapper to match.
const DESIGNED: FlagCode[] = ['gb', 'kh', 'kr']

// Flag chip. The designed SVGs are square (24×24) circular badges, so render
// in a square box with `contain` — never crop them. `size` is the box width.
export function Flag({ code, size = 22 }: { code: FlagCode; size?: number }) {
  if (!DESIGNED.includes(code)) {
    return (
      <Box sx={{
        width: Math.round(size * (4 / 3)),
        height: size,
        borderRadius: '2px',
        overflow: 'hidden',
        border: '1.5px solid #D9D9D9',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box
          component="img"
          src={encodeURI(FLAG_SRC[code])}
          alt=""
          aria-hidden
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={encodeURI(FLAG_SRC[code])}
      alt=""
      aria-hidden
      sx={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
      }}
    />
  )
}
