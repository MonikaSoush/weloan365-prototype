import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'
import { BLUE } from '../mwl/MwlParts'

// ─────────────────────────────────────────────────────────────────────────────
// Guarantor view · Web — Review step (1/2). Reached from the web invite's
// "Get started". Still inside the mobile-browser chrome (address bar + nav).
// ─────────────────────────────────────────────────────────────────────────────
const MUTED = '#8A94A6'

const ROWS: [string, string][] = [
  ['Destination', 'South Korea'],
  ['Amount', 'USD 2,000'],
  ['Tenure', '12 months'],
  ['Interest Only Payment', '3 months'],
  ['Interest', '1.50% / month'],
]

const MEANS = [
  { tone: 'ok', text: 'You confirm you know Sok Vanna and support their loan.' },
  { tone: 'warn', text: 'If the borrower cannot repay, NH may ask you to repay the balance.' },
  { tone: 'info', text: 'NH will check your credit record with CBC, with your consent.' },
] as const

function MeansIcon({ tone }: { tone: 'ok' | 'warn' | 'info' }) {
  const map = {
    ok: { bg: '#E7F5EC', color: '#1FA85C' },
    warn: { bg: '#FBF1DD', color: '#C47F11' },
    info: { bg: '#E7F0FF', color: BLUE },
  }[tone]
  return (
    <Box sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: map.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Box component="svg" viewBox="0 0 24 24" fill="none" stroke={map.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 16, height: 16 }}>
        {tone === 'ok' && <path d="M20 6 9 17l-5-5" />}
        {tone === 'warn' && (
          <>
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </>
        )}
        {tone === 'info' && (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </>
        )}
      </Box>
    </Box>
  )
}


export default function GuarantorReviewScreen() {
  const navigate = useNavigate()
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
      <Box className="scroll-content" sx={{ flex: 1, bgcolor: '#fff', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid #F0F2F5' }}>
          <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ width: 36, height: 36, bgcolor: '#fff', border: '1px solid #E2E6EC', '&:hover': { bgcolor: '#F2F3F5' } }}>
            <Icon name="arrowLeft" size={18} color="#0B0F1A" />
          </IconButton>
          <Typography sx={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#0B0F1A' }}>Confirm As Guarantor</Typography>
          <Typography sx={{ width: 36, textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#8A94A6' }}>1 / 2</Typography>
        </Box>

        <Box sx={{ px: 3, pt: 2.5, pb: 3 }}>
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0B0F1A' }}>The loan you're backing</Typography>

          {/* Loan facts */}
          <Box sx={{ mt: 2, border: '1px solid #ECEFF3', borderRadius: '14px', overflow: 'hidden' }}>
            {ROWS.map(([k, v], i) => (
              <Box key={k} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, px: 2, py: 1.5, borderTop: i ? '1px solid #F0F2F5' : 'none' }}>
                <Typography sx={{ fontSize: 14, color: MUTED, flexShrink: 0 }}>{k}</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0B0F1A', textAlign: 'right' }}>{v}</Typography>
              </Box>
            ))}
          </Box>

          {/* What being a guarantor means */}
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#0B0F1A', mt: 3, mb: 1.5 }}>What being a guarantor means</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            {MEANS.map((m) => (
              <Box key={m.text} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                <MeansIcon tone={m.tone} />
                <Typography sx={{ fontSize: 14, color: '#3A4256', lineHeight: 1.45, flex: 1, mt: 0.25 }}>{m.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Pinned action */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: 1.5, bgcolor: '#fff', borderTop: '1px solid #F0F2F5' }}>
        <Button variant="contained" fullWidth onClick={() => navigate('/guarantor-confirm')} endIcon={<Icon name="arrowRight" size={18} />}
          sx={{ height: 52, borderRadius: '12px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}>
          Continue
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
