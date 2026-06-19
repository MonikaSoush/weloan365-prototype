import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'

// ─────────────────────────────────────────────────────────────────────────────
// Contract Ready — assessment complete, loan approved, terms now final & fixed.
// Reached from the submitted screen's "Guarantor Confirmed" demo control.
// ─────────────────────────────────────────────────────────────────────────────
const BLUE = '#275CB2'
const GREEN = '#1FA85C'
const LABEL = '#737373'
const HEADING = '#0B0F1A'

const TERMS: [string, string][] = [
  ['Loan amount', '$5,000.00'],
  ['Interest rate', '1.4% / month'],
  ['Tenure', '24 months'],
  ['Grace period', '3 months'],
  ['Est. monthly', '$245.00'],
]

export default function MwlContractScreen() {
  const navigate = useNavigate()
  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      {/* Header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', px: 1, py: 1.25, bgcolor: '#F5F5F5' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: HEADING }}>
          <Icon name="arrowLeft" size={22} color={HEADING} />
        </IconButton>
        <Typography sx={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 800, color: HEADING }}>Contract Ready</Typography>
        <Box sx={{ width: 44 }} />
      </Box>

      <Box className="scroll-content" sx={{ flex: 1, px: 3, pt: 2, pb: 3, display: 'flex', flexDirection: 'column', gap: 2.75 }}>
        {/* Approved hero */}
        <Box sx={{ borderRadius: '20px', p: '34px 26px', textAlign: 'center', background: 'linear-gradient(160deg, #14366B 0%, #2A5BA6 100%)', boxShadow: '0 16px 40px rgba(20,54,107,0.28)' }}>
          <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.25 }}>
            <Box component="svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 28, height: 28 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="m9 15 2 2 4-4" />
            </Box>
          </Box>
          <Typography sx={{ fontSize: 23, fontWeight: 800, color: '#fff' }}>Your loan is approved</Typography>
          <Typography sx={{ fontSize: 13.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.55, mt: 1, px: 1 }}>
            Assessment is complete. Your final terms are now confirmed and ready for you to sign.
          </Typography>
        </Box>

        {/* Final & fixed note */}
        <Box sx={{ display: 'flex', gap: 1.5, bgcolor: '#E7F5EC', borderRadius: '16px', p: '18px 20px' }}>
          <Box sx={{ mt: '1px' }}><Icon name="check" size={18} color={GREEN} /></Box>
          <Typography sx={{ fontSize: 13, color: '#2E5E43', lineHeight: 1.55, flex: 1 }}>
            The indicative terms you requested are now <Box component="span" sx={{ fontWeight: 800 }}>final and fixed</Box> — no more "to be confirmed". What you sign is exactly what applies.
          </Typography>
        </Box>

        {/* Confirmed terms */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '16px', p: '10px 22px 14px' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', color: LABEL, mt: 2, mb: 1 }}>CONFIRMED LOAN TERMS</Typography>
          {TERMS.map(([k, v], i) => (
            <Box key={k} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 2, borderTop: i ? '1px solid #F0F0F0' : 'none' }}>
              <Typography sx={{ fontSize: 14, color: LABEL, flexShrink: 0 }}>{k}</Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 800, color: HEADING, textAlign: 'right' }}>{v}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Sign CTA */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: '40px', bgcolor: '#F5F5F5' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/mwl-sign-review')}
          sx={{ height: 54, borderRadius: '14px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
        >
          Review &amp; Sign Contract
        </Button>
      </Box>
    </Box>
  )
}
