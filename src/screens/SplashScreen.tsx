import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// ─── Splash screen — brand blue, centered logo, loading spinner ──────────────
export default function SplashScreen() {
  const navigate = useNavigate()

  // Auto-advance to Home after a 3s brand hold.
  useEffect(() => {
    const t = setTimeout(() => navigate('/home?v=1'), 3000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <Box
      className="screen-enter"
      sx={{
        // Full-bleed brand background — extend up into the 47px status-bar reserve.
        height: 'calc(100% + 47px)',
        mt: '-47px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(165deg, #1C4DB8 0%, #0A3A9E 100%)',
        px: 4,
      }}
    >
      <Box
        component="img"
        src="/assets/brand/logo_white.png"
        alt="NongHyup Finance (Cambodia) Plc"
        sx={{ width: 240, height: 'auto', display: 'block' }}
      />

      <CircularProgress size={28} thickness={4} sx={{ color: '#fff', mt: 4 }} />
    </Box>
  )
}
