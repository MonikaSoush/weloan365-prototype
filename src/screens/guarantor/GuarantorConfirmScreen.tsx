import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'
import { AssetImg, asset } from '../../components/home/media'
import { BLUE, BottomSheet } from '../mwl/MwlParts'
import { setGuarantorProgress } from '../../workspace/guarantorProgress'

// ─────────────────────────────────────────────────────────────────────────────
// Guarantor view · Web — Confirm step. Reached from the review page's
// "Continue". Still inside the mobile-browser chrome. ID upload is optional.
// ─────────────────────────────────────────────────────────────────────────────
const MUTED = '#8A94A6'
const GREEN = '#1FA85C'
const NID = asset('banners/NID.png')

const TERMS = [
  <>Be the <b>guarantor</b> for this loan and responsible for all obligations required by law if the borrower cannot repay; and</>,
  <>Allow NH to check my credit record with <b>CBC (Credit Bureau Cambodia)</b>.</>,
]

export default function GuarantorConfirmScreen() {
  const navigate = useNavigate()
  const [uploaded, setUploaded] = useState(false)
  const [sampleOpen, setSampleOpen] = useState(false)
  // Reaching Confirm means the guarantor finished reviewing the loan.
  useEffect(() => setGuarantorProgress(2), [])

  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F2F3F5' }}>
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
          <Typography sx={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#0B0F1A' }}>Confirm</Typography>
          <Box sx={{ width: 36 }} />
        </Box>

        <Box sx={{ px: 3, pt: 2.5, pb: 3 }}>
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0B0F1A' }}>Confirm as guarantor</Typography>

          {/* ID upload (optional) */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2.5, mb: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#3A4256' }}>National ID — Front</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.6px', color: '#A6AEBD' }}>OPTIONAL</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: uploaded ? '#EAF7EF' : '#fff', border: uploaded ? '1px solid #BFE6CF' : '1px dashed #CBD3DF', borderRadius: '12px', p: '10px 12px' }}>
            <Box sx={{ width: 52, height: 40, borderRadius: '8px', overflow: 'hidden', flexShrink: 0, bgcolor: '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {uploaded ? (
                <AssetImg src={NID} alt="National ID — Front" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} fallback={<Icon name="image" size={18} color="#B4BCC9" />} />
              ) : (
                <Icon name="camera" size={18} color="#9AA3B2" />
              )}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }} noWrap>{uploaded ? 'Photo added' : 'Upload Photo'}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: uploaded ? GREEN : MUTED }}>{uploaded ? 'Photo uploaded' : 'Optional · speeds things up'}</Typography>
              <Typography role="button" onClick={() => setSampleOpen(true)} sx={{ fontSize: 12, fontWeight: 600, color: BLUE, cursor: 'pointer', display: 'inline-block', mt: '1px' }}>
                View sample
              </Typography>
            </Box>
            {uploaded ? (
              <Box role="button" aria-label="Remove photo" onClick={() => setUploaded(false)} sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                <Icon name="check" size={14} color="#fff" />
              </Box>
            ) : (
              <Box role="button" aria-label="Upload National ID" onClick={() => setUploaded(true)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, bgcolor: '#EEF3FC', borderRadius: '999px', px: 1.25, py: 0.75, cursor: 'pointer', '&:active': { opacity: 0.7 } }}>
                <Icon name="camera" size={15} color={BLUE} />
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: BLUE }}>Upload</Typography>
              </Box>
            )}
          </Box>
          <Typography sx={{ fontSize: 12.5, color: MUTED, lineHeight: 1.5, mt: 1.25 }}>
            No photo? No problem — your branch officer will collect your ID later by SMS or in person.
          </Typography>

          {/* Agreement */}
          <Box sx={{ bgcolor: '#F4F6F9', borderRadius: '14px', p: '16px', mt: 3 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#0B0F1A', mb: 1.5 }}>By tapping "Confirm as Guarantor", I agree to:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {TERMS.map((t, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                  <Box sx={{ mt: '2px' }}><Icon name="check" size={17} color={BLUE} /></Box>
                  <Typography sx={{ fontSize: 13.5, color: '#3A4256', lineHeight: 1.45, flex: 1 }}>{t}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Pinned action */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: 1.5, bgcolor: '#fff', borderTop: '1px solid #F0F2F5' }}>
        <Typography sx={{ fontSize: 12, color: MUTED, textAlign: 'center', mb: 1 }}>Tapping below means you agree to the above.</Typography>
        <Button variant="contained" fullWidth onClick={() => navigate('/guarantor-confirmed')}
          sx={{ height: 52, borderRadius: '12px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}>
          Confirm as Guarantor
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

      {/* Sample ID preview — slide-up sheet */}
      <BottomSheet open={sampleOpen} onClose={() => setSampleOpen(false)} title="National ID — Front (sample)">
        <Box sx={{ bgcolor: '#EDEDED', borderRadius: '14px', overflow: 'hidden' }}>
          <AssetImg src={NID} alt="National ID — Front sample" sx={{ width: '100%', height: 'auto', display: 'block' }}
            fallback={<Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="image" size={40} color="#B4BCC9" /></Box>} />
        </Box>
        <Typography sx={{ fontSize: 12.5, color: MUTED, lineHeight: 1.5 }}>
          Place your ID flat, fill the frame, and make sure all four corners and the text are sharp and glare-free.
        </Typography>
        <Button variant="contained" fullWidth onClick={() => setSampleOpen(false)}
          sx={{ height: 50, borderRadius: '14px', fontSize: 15, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}>
          Got it
        </Button>
      </BottomSheet>
    </Box>
  )
}
