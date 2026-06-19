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
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#0B0F1A', textAlign: 'center', mb: 2.5 }}>Confirm As Guarantor</Typography>

          {/* Profile avatar — illustrated human face */}
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', mb: 1.5, boxShadow: '0 4px 16px rgba(0,0,0,0.18)', flexShrink: 0 }}>
            <Box component="svg" viewBox="0 0 100 100" sx={{ width: '100%', height: '100%', display: 'block' }}>
              {/* BG */}
              <rect width="100" height="100" fill="#D4E8F5"/>
              {/* Shirt */}
              <path d="M5 108 Q8 82 18 78 Q32 72 43 76 L50 85 L57 76 Q68 72 82 78 Q92 82 95 108Z" fill="#275CB2"/>
              {/* Collar */}
              <path d="M43 76 L50 85 L57 76 Q54 80 50 81 Q46 80 43 76Z" fill="#1F4F9E"/>
              {/* Neck */}
              <rect x="44" y="65" width="12" height="14" rx="4" fill="#C49060"/>
              {/* Hair — sides */}
              <ellipse cx="29" cy="46" rx="7" ry="12" fill="#1A0800"/>
              <ellipse cx="71" cy="46" rx="7" ry="12" fill="#1A0800"/>
              {/* Hair — top */}
              <ellipse cx="50" cy="29" rx="24" ry="21" fill="#1A0800"/>
              {/* Face */}
              <ellipse cx="50" cy="52" rx="21" ry="24" fill="#C49060"/>
              {/* Ears */}
              <ellipse cx="29.5" cy="52" rx="4.5" ry="6" fill="#B88050"/>
              <ellipse cx="70.5" cy="52" rx="4.5" ry="6" fill="#B88050"/>
              {/* Face over ears */}
              <ellipse cx="50" cy="52" rx="20" ry="23" fill="#C49060"/>
              {/* Eyebrows */}
              <path d="M37 42 Q42 39 47 42" stroke="#1A0800" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
              <path d="M53 42 Q58 39 63 42" stroke="#1A0800" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
              {/* Eye whites */}
              <ellipse cx="42" cy="49" rx="5.5" ry="6" fill="#fff"/>
              <ellipse cx="58" cy="49" rx="5.5" ry="6" fill="#fff"/>
              {/* Iris */}
              <ellipse cx="42" cy="49.5" rx="3.8" ry="4.2" fill="#2A1005"/>
              <ellipse cx="58" cy="49.5" rx="3.8" ry="4.2" fill="#2A1005"/>
              {/* Eye shine */}
              <circle cx="43.8" cy="47.8" r="1.3" fill="#fff"/>
              <circle cx="59.8" cy="47.8" r="1.3" fill="#fff"/>
              {/* Upper lash line */}
              <path d="M36.5 46 Q42 43 47.5 46" stroke="#1A0800" strokeWidth="1.4" fill="none"/>
              <path d="M52.5 46 Q58 43 63.5 46" stroke="#1A0800" strokeWidth="1.4" fill="none"/>
              {/* Nose */}
              <ellipse cx="46.5" cy="59" rx="2.8" ry="2" fill="rgba(0,0,0,0.1)"/>
              <ellipse cx="53.5" cy="59" rx="2.8" ry="2" fill="rgba(0,0,0,0.1)"/>
              <path d="M47 56 Q50 61 53 56" stroke="#A07040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* Lips */}
              <path d="M43 65.5 Q50 71.5 57 65.5" stroke="#A06040" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M43 65.5 Q50 68.5 57 65.5" fill="#C07858" opacity="0.75"/>
            </Box>
          </Box>

          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', color: '#8A94A6', textAlign: 'center' }}>NH LOANS · GUARANTOR REQUEST</Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0B0F1A', textAlign: 'center', lineHeight: 1.25, mt: 0.75 }}>
            Sok Vanna has asked you to be their guarantor
          </Typography>

          {/* Identity row */}
          <Box sx={{ width: '100%', bgcolor: '#F8F9FB', border: '1px solid #ECEFF3', borderRadius: '12px', px: '14px', py: '11px', mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="svg" viewBox="0 0 24 24" fill="none" stroke="#8A94A6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 16, height: 16, flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
              </Box>
              <Typography sx={{ fontSize: 13, color: '#6B7280' }}>Phone</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0B0F1A', letterSpacing: '0.3px' }}>+855 96 ••• 5678</Typography>
          </Box>

          {/* Loan summary */}
          <Box sx={{ width: '100%', bgcolor: '#EEF2F8', borderRadius: '14px', p: '16px', mt: 1.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
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
