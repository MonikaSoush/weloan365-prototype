import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../components/Icon'
import { AssetImg, asset } from '../components/home/media'

// ─────────────────────────────────────────────────────────────────────────────
// Early payoff · Submitted — payoff notice received; the actual payoff is
// completed at the branch.
// ─────────────────────────────────────────────────────────────────────────────
const BLUE = '#275CB2'

export default function EarlyPayoffSuccessScreen() {
  const navigate = useNavigate()

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Mascot */}
          <Box sx={{ height: 230, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, overflow: 'hidden' }}>
            <AssetImg
              src={asset('illustrations/mascot_done.png')}
              alt=""
              sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
              fallback={<Icon name="checkCircle" size={52} color="#2E7D32" strokeWidth={2} />}
            />
          </Box>

          <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.5px', mb: 1 }}>
            Request Submitted
          </Typography>
          <Typography sx={{ fontSize: 14.5, color: '#6B7280', lineHeight: 1.55 }}>
            Your Payoff Notice has been submitted. Please visit your branch to complete the actual payoff — the precise amount, any penalty, and collateral release are handled there.
          </Typography>

          <Box sx={{ bgcolor: '#EAF1FC', borderRadius: '999px', px: 2, py: 0.75, mt: 2.5 }}>
            <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: BLUE, letterSpacing: '0.3px' }}>Reference: NOP-5777</Typography>
          </Box>

          <Typography sx={{ fontSize: 13, color: '#9AA3B2', mt: 2.5 }}>
            A loan officer will contact you within 2 business days.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexShrink: 0, px: 3, pt: 2.5, pb: '44px', bgcolor: '#fff' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/my-loan')}
          sx={{ height: 52, borderRadius: '14px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
        >
          Back to My Loans
        </Button>
      </Box>
    </Box>
  )
}
