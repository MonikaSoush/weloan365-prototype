import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { asset } from '../components/home/media'

// ─────────────────────────────────────────────────────────────────────────────
// Welcome — the Visitor's landing after the splash screen. A friendly "no loans
// yet" prompt that funnels into the Products tab via "Visit & Apply Loans".
// (Drop a mascot image at /assets/illustrations/welcome-mascot.png to replace
// the placeholder illustration.)
// ─────────────────────────────────────────────────────────────────────────────
const BLUE = '#275CB2'

export default function WelcomeScreen() {
  const navigate = useNavigate()
  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5', px: 3 }}>
      {/* Illustration + copy, vertically centered */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Box component="img" src={asset('illustrations/mascot_apply.png')} alt="" sx={{ width: 336, height: 'auto', display: 'block' }} />
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0B0F1A', mt: 3 }}>
          No loans yet
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#8A94A6', mt: 1, maxWidth: 280, lineHeight: 1.6 }}>
          You don't have any loans yet. Explore our products and apply in minutes.
        </Typography>
      </Box>

      {/* CTA pinned near the bottom */}
      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate('/products')}
        sx={{ mb: '36px', height: 54, borderRadius: '14px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
      >
        Visit &amp; Apply Loans
      </Button>
    </Box>
  )
}
