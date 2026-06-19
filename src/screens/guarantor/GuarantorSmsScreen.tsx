import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'

// ─────────────────────────────────────────────────────────────────────────────
// Guarantor view · SMS — what the guarantor receives on their phone.
// Tapping the verify link opens the web invite (GuarantorWebScreen).
// ─────────────────────────────────────────────────────────────────────────────
const LINK = '#0A7CFF'

export default function GuarantorSmsScreen() {
  const navigate = useNavigate()
  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      {/* iMessage-style header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', px: 1, py: 1, borderBottom: '1px solid #ECECEC' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: LINK }}>
          <Icon name="chevronLeft" size={26} color={LINK} />
        </IconButton>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: '#1FA84F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>NH</Typography>
          </Box>
          <Typography sx={{ fontSize: 11, color: '#8A94A6', mt: 0.25 }}>NHFC MFI</Typography>
        </Box>
        <Box sx={{ width: 44 }} />
      </Box>

      {/* Thread */}
      <Box className="scroll-content" sx={{ flex: 1, px: 2, pt: 3 }}>
        <Typography sx={{ fontSize: 12, color: '#8A94A6', textAlign: 'center', mb: 2 }}>
          <Box component="span" sx={{ fontWeight: 700, color: '#6B7280' }}>Monday</Box> at 11:04PM
        </Typography>
        <Box sx={{ maxWidth: '82%', bgcolor: '#E9E9EB', borderRadius: '18px', borderBottomLeftRadius: '5px', px: 1.75, py: 1.25 }}>
          <Typography sx={{ fontSize: 15, color: '#0B0F1A', lineHeight: 1.45 }}>
            NHFC: Krong Kampuchea has listed you as a guarantor for an MWL (Korea) loan application.
          </Typography>
          <Typography sx={{ fontSize: 15, color: '#0B0F1A', lineHeight: 1.45, mt: 1.5 }}>
            Please review and confirm securely using the link below:
          </Typography>
          <Typography role="button" onClick={() => navigate('/guarantor-web')} sx={{ fontSize: 15, color: LINK, textDecoration: 'underline', cursor: 'pointer', wordBreak: 'break-all', '&:active': { opacity: 0.6 } }}>
            nhfc.com.kh/verify/238uGHO
          </Typography>
          <Typography sx={{ fontSize: 15, color: '#0B0F1A', lineHeight: 1.45, mt: 1.5 }}>
            This process takes less than 2 minutes.
          </Typography>
          <Typography sx={{ fontSize: 15, color: '#0B0F1A', lineHeight: 1.45 }}>
            Need help? Call us free of charge:
          </Typography>
          <Typography sx={{ fontSize: 15, color: LINK, textDecoration: 'underline' }}>023 999 888</Typography>
        </Box>
      </Box>
    </Box>
  )
}
