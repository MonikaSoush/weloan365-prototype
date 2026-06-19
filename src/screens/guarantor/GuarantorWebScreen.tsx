import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../../components/Icon'
import { BLUE } from '../mwl/MwlParts'
import { setGuarantorProgress } from '../../workspace/guarantorProgress'

// ─────────────────────────────────────────────────────────────────────────────
// Guarantor view · Web — the page the guarantor lands on after tapping the SMS
// link. Styled as a mobile browser (address bar + bottom nav chrome).
// ─────────────────────────────────────────────────────────────────────────────
export default function GuarantorWebScreen() {
  const navigate = useNavigate()
  // Opening the link from the SMS completes the "Open SMS Link" step.
  useEffect(() => setGuarantorProgress(1), [])
  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F2F3F5' }}>
      {/* Browser address bar */}
      <Box sx={{ flexShrink: 0, px: 2, pt: 1.5, pb: 1, bgcolor: '#F2F3F5', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#E3E5E8', borderRadius: '10px', px: 1.5, height: 38 }}>
          <Icon name="lock" size={13} color="#6B7280" />
          <Typography sx={{ flex: 1, fontSize: 14, color: '#0B0F1A', textAlign: 'center' }}>nonghyup.com</Typography>
          <Icon name="share" size={16} color="#6B7280" />
        </Box>
      </Box>

      {/* Page content */}
      <Box className="scroll-content" sx={{ flex: 1, bgcolor: '#fff' }}>
        <Box sx={{ px: 3, pt: 3, pb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: '#E7F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Box component="svg" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 34, height: 34 }}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </Box>
          </Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', color: '#8A94A6', textAlign: 'center' }}>NH LOANS · GUARANTOR REQUEST</Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0B0F1A', textAlign: 'center', lineHeight: 1.25, mt: 0.75 }}>
            Sok Vanna has asked you to be their guarantor
          </Typography>

          {/* Loan summary */}
          <Box sx={{ width: '100%', bgcolor: '#EEF2F8', borderRadius: '14px', p: '16px', mt: 2.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {[
              ['Loan', 'USD 2,000'],
              ['Purpose', 'Migrant Worker Loan'],
              ['Destination', 'South Korea'],
            ].map(([k, v]) => (
              <Box key={k} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Typography sx={{ fontSize: 14, color: BLUE, flexShrink: 0 }}>{k}</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#0B0F1A', textAlign: 'right' }}>{v}</Typography>
              </Box>
            ))}
          </Box>

          <Typography sx={{ fontSize: 13, color: '#8A94A6', textAlign: 'center', lineHeight: 1.5, mt: 2 }}>
            Takes about <Box component="span" sx={{ color: BLUE, fontWeight: 700 }}>1 minute</Box>. Review the loan, then agree. You can add your ID now or let the branch officer collect it later.
          </Typography>
        </Box>
      </Box>

      {/* Pinned actions */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: 1.5, bgcolor: '#fff', borderTop: '1px solid #F0F2F5', display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" fullWidth onClick={() => navigate('/guarantor-review')} endIcon={<Icon name="arrowRight" size={18} />}
          sx={{ height: 52, borderRadius: '12px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}>
          Get started
        </Button>
        <Button variant="outlined" fullWidth onClick={() => navigate(-1)}
          sx={{ mt: 1.25, height: 52, borderRadius: '12px', fontSize: 15, fontWeight: 700, color: '#0B0F1A', borderColor: '#E2E6EC', bgcolor: '#fff', '&:hover': { borderColor: '#CBD3DF', bgcolor: '#F7F8FA' } }}>
          I don't know this person
        </Button>
      </Box>

      {/* Browser bottom chrome */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', px: 2, py: 1.5, pb: '20px', bgcolor: '#F2F3F5', borderTop: '1px solid #E2E6EC', color: '#9AA3B2' }}>
        <Icon name="arrowLeft" size={22} color="#9AA3B2" />
        <Icon name="arrowRight" size={22} color="#C9D2DE" />
        <Icon name="plus" size={22} color="#9AA3B2" />
        <Box sx={{ width: 18, height: 18, border: '2px solid #9AA3B2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 10, fontWeight: 800, color: '#9AA3B2' }}>1</Typography>
        </Box>
        <Icon name="dotsVertical" size={22} color="#9AA3B2" />
      </Box>
    </Box>
  )
}
