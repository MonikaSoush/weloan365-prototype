import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'

// ─────────────────────────────────────────────────────────────────────────────
// Review Final Terms — the binding contract summary the borrower reads before
// signing. Reached from the Contract Ready screen's "Review & Sign Contract".
// ─────────────────────────────────────────────────────────────────────────────
const BLUE = '#275CB2'
const LABEL = '#737373'
const HEADING = '#0B0F1A'

const TERMS: [string, string][] = [
  ['Lender', 'NH Loans Co., Ltd.'],
  ['Borrower', 'Dong Phally'],
  ['Loan amount', '$5,000.00'],
  ['Interest rate', '1.4% / month'],
  ['Tenure', '24 months'],
  ['Grace period', '3 months'],
  ['Upfront fee', '3% of approved amount'],
  ['CBC fee', '$10.00'],
]

function FileGlyph({ size = 18, color = BLUE }: { size?: number; color?: string }) {
  return (
    <Box component="svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" sx={{ width: size, height: size }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </Box>
  )
}

export default function MwlSignReviewScreen() {
  const navigate = useNavigate()
  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      {/* Header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', px: 1, py: 1.25, bgcolor: '#F5F5F5' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: HEADING }}>
          <Icon name="arrowLeft" size={22} color={HEADING} />
        </IconButton>
        <Typography sx={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 800, color: HEADING }}>Review Final Terms</Typography>
        <Box sx={{ width: 44 }} />
      </Box>

      <Box className="scroll-content" sx={{ flex: 1, px: 3, pt: 1, pb: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Typography sx={{ fontSize: 13.5, color: LABEL, lineHeight: 1.55 }}>
          Read carefully. By signing, you agree to these exact terms — this is a binding loan contract.
        </Typography>

        {/* Final confirmed terms */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '16px', p: '10px 22px 14px' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', color: LABEL, mt: 2, mb: 1 }}>FINAL · CONFIRMED</Typography>
          {TERMS.map(([k, v], i) => (
            <Box key={k} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1.75, borderTop: i ? '1px solid #F0F0F0' : 'none' }}>
              <Typography sx={{ fontSize: 14, color: LABEL, flexShrink: 0 }}>{k}</Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 800, color: HEADING, textAlign: 'right' }}>{v}</Typography>
            </Box>
          ))}
        </Box>

        {/* Full document link */}
        <Box
          role="button"
          onClick={() => navigate('/mwl-contract-doc')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#EAF1FC', borderRadius: '14px', p: '16px 18px', cursor: 'pointer', '&:active': { opacity: 0.8 } }}
        >
          <FileGlyph size={22} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: BLUE }}>View full contract document</Typography>
            <Typography sx={{ fontSize: 12.5, color: '#5B7299' }}>All clauses · terms &amp; conditions</Typography>
          </Box>
          <Icon name="chevronRight" size={20} color={BLUE} />
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: '40px', bgcolor: '#F5F5F5', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate('/mwl-contract-doc')}
          startIcon={<FileGlyph size={18} />}
          sx={{ height: 52, borderRadius: '14px', fontSize: 15, fontWeight: 700, color: BLUE, borderColor: '#B9CDEA', bgcolor: '#fff', '&:hover': { borderColor: '#9CC3FF', bgcolor: '#F7FAFF' } }}
        >
          View Full Contract
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/mwl-sign')}
          sx={{ height: 54, borderRadius: '14px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
        >
          Continue to Sign
        </Button>
      </Box>
    </Box>
  )
}
