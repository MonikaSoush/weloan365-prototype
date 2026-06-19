import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../../components/Icon'
import { AssetImg, asset } from '../../components/home/media'
import { BLUE } from '../mwl/MwlParts'
import { setGuarantorProgress } from '../../workspace/guarantorProgress'

// ─────────────────────────────────────────────────────────────────────────────
// Guarantor view · Web — Confirmed. Reached after "Confirm as Guarantor".
// Still inside the mobile-browser chrome. Mascot: mascot_confirm.png.
// ─────────────────────────────────────────────────────────────────────────────
const MUTED = '#8A94A6'

const NEXT = [
  'Your branch officer will collect your National ID by SMS or in person',
  'NH runs the credit checks',
  'A branch officer assesses the application',
  'Both you and the borrower are notified of the decision',
]

export default function GuarantorConfirmedScreen() {
  const navigate = useNavigate()
  // Guarantor has confirmed — mark all steps complete on the borrower's screen.
  useEffect(() => setGuarantorProgress(3), [])
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

      {/* Page */}
      <Box className="scroll-content" sx={{ flex: 1, bgcolor: '#fff' }}>
        <Box sx={{ px: 3, pt: 2, pb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Mascot */}
          <Box sx={{ height: 230, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <AssetImg
              src={asset('illustrations/mascot_confirm.png')}
              alt=""
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              fallback={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, color: '#C9D2DE' }}>
                  <Icon name="checkCircle" size={48} color="#1FA85C" />
                  <Typography sx={{ fontSize: 12, color: '#B4BCC9' }}>mascot_confirm.png</Typography>
                </Box>
              }
            />
          </Box>

          <Typography sx={{ fontSize: 15, color: MUTED, textAlign: 'center', lineHeight: 1.5, mt: 1 }}>
            Thank you. You're now the guarantor for Sok Vanna's loan. NH will continue processing the application.
          </Typography>

          {/* What happens next */}
          <Box sx={{ width: '100%', bgcolor: '#EAF1FC', borderRadius: '14px', p: '16px', mt: 3 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.6px', color: BLUE, mb: 1.25 }}>WHAT HAPPENS NEXT</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {NEXT.map((t) => (
                <Box key={t} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <Typography sx={{ fontSize: 14, color: '#2B4A7E', lineHeight: 1.5 }}>•</Typography>
                  <Typography sx={{ fontSize: 14, color: '#2B4A7E', lineHeight: 1.5, flex: 1 }}>{t}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Typography sx={{ fontSize: 13, color: MUTED, textAlign: 'center', lineHeight: 1.5, mt: 3 }}>
            Nothing more to do — you can safely close this page.
          </Typography>
        </Box>
      </Box>

      {/* Pinned action */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: 1.5, bgcolor: '#fff', borderTop: '1px solid #F0F2F5' }}>
        <Button variant="contained" fullWidth onClick={() => navigate('/mwl-success')}
          sx={{ height: 52, borderRadius: '12px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}>
          Done
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
