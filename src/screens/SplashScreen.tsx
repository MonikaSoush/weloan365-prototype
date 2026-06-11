import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// ─── Splash screen — brand blue, centered logo, loading spinner ──────────────
export default function SplashScreen() {
  return (
    <Box
      className="screen-enter"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(165deg, #1C4DB8 0%, #0A3A9E 100%)',
        px: 4,
      }}
    >
      <Box sx={{ flex: 1 }} />

      <Box
        component="img"
        src="/assets/brand/header_logo.svg"
        alt="NongHyup Finance (Cambodia) Plc"
        sx={{ width: 240, height: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }}
      />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', pb: 6 }}>
        <CircularProgress size={28} thickness={4} sx={{ color: '#fff' }} />
      </Box>
    </Box>
  )
}
