import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from '../../components/Icon'

// Corner bracket for the scan frame
function Corner({ sx }: { sx: object }) {
  return <Box sx={{ position: 'absolute', width: 34, height: 34, borderColor: '#fff', ...sx }} />
}

export default function QrSignInScreen() {
  const navigate = useNavigate()

  return (
    <Box className="screen-enter" sx={{ height: '100%', position: 'relative', overflow: 'hidden', bgcolor: '#15171C' }}>
      {/* Faux camera viewfinder */}
      <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 40%, #3A3022 0%, #1B1A18 60%, #0E0F12 100%)' }} />

      {/* Header */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2.5, zIndex: 2 }}>
        <Box component="button" type="button" onClick={() => navigate('/sign-up')} aria-label="Back"
          sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <Icon name="chevronLeft" size={24} color="#fff" />
        </Box>
        <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Sign in with QR</Typography>
        <Box component="button" type="button" aria-label="Info"
          sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <Icon name="info" size={22} color="#fff" />
        </Box>
      </Box>

      {/* Scan frame */}
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 230, height: 230 }}>
        <Corner sx={{ top: 0, left: 0, borderTop: '4px solid #fff', borderLeft: '4px solid #fff', borderTopLeftRadius: 14 }} />
        <Corner sx={{ top: 0, right: 0, borderTop: '4px solid #fff', borderRight: '4px solid #fff', borderTopRightRadius: 14 }} />
        <Corner sx={{ bottom: 0, left: 0, borderBottom: '4px solid #fff', borderLeft: '4px solid #fff', borderBottomLeftRadius: 14 }} />
        <Corner sx={{ bottom: 0, right: 0, borderBottom: '4px solid #fff', borderRight: '4px solid #fff', borderBottomRightRadius: 14 }} />
      </Box>

      {/* Bottom controls */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', gap: 1.5, px: 3, pb: '44px', zIndex: 2 }}>
        <Box component="button" type="button"
          sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, height: 52, px: 2.5, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.92)', border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: '#0B0F1A', cursor: 'pointer' }}>
          <Icon name="flashlight" size={18} color="#0B0F1A" />
          Flash off
        </Box>
        <Box component="button" type="button" onClick={() => navigate('/otp')}
          sx={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, height: 52, borderRadius: '12px', bgcolor: '#275CB2', border: 'none', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          <Icon name="upload" size={18} color="#fff" />
          Upload QR
        </Box>
      </Box>
    </Box>
  )
}
