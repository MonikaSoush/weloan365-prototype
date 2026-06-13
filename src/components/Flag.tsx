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

// Flag chip. The designed SVGs are square (24×24) circular badges, so render
// in a square box with `contain` — never crop them. `size` is the box width.
export function Flag({ code, size = 22 }: { code: FlagCode; size?: number }) {
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
