import { useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'

// ─────────────────────────────────────────────────────────────────────────────
// Loan Restructuring — single-step request. Reached by tapping "Request
// Restructure" on the Loan Detail screen. Submitting opens the success screen.
// ─────────────────────────────────────────────────────────────────────────────
const BLUE = '#275CB2'
const HEADING = '#0B0F1A'
const LABEL = '#737373'
const MUTED = '#8A94A6'
const RED = '#E11D48'

const REASONS = ['Job loss or reduced income', 'Accident or illness', 'Family emergency', 'Business downturn', 'Natural disaster', 'Other']

const fieldSx = {
  width: '100%',
  boxSizing: 'border-box' as const,
  bgcolor: '#fff',
  border: '1px solid #E2E6EC',
  borderRadius: '12px',
  height: 50,
  px: 1.75,
  fontSize: 15,
  fontFamily: 'inherit',
  color: HEADING,
  outline: 'none',
  '&:focus': { borderColor: BLUE },
}

function SectionHead({ n, label, tag }: { n: number; label: string; tag?: string }) {
  return (
    <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.5px', color: MUTED, mt: 0.5, mb: 1.25 }}>
      {n} · {label}
      {tag && <Box component="span" sx={{ color: '#1FA85C', ml: 0.5 }}>· {tag}</Box>}
    </Typography>
  )
}

function LoanRow({ label, value, danger }: { label: string; value: string; danger?: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: '7px' }}>
      <Typography sx={{ fontSize: 14, color: LABEL }}>{label}</Typography>
      <Typography sx={{ fontSize: 15, fontWeight: 800, color: danger ? RED : HEADING }}>{value}</Typography>
    </Box>
  )
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontSize: 14, fontWeight: 700, color: HEADING, mb: 0.75 }}>{children}</Typography>
}

export default function RestructureInfoScreen() {
  const navigate = useNavigate()
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [extend, setExtend] = useState('12')
  const [grace, setGrace] = useState('3')

  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      {/* Header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', px: 1.5, py: 1.5, bgcolor: '#F5F5F5' }}>
        <IconButton onClick={() => navigate('/my-loan-detail')} aria-label="Back" sx={{ width: 38, height: 38, bgcolor: '#fff', border: '1px solid #E2E6EC', '&:hover': { bgcolor: '#F2F3F5' } }}>
          <Icon name="chevronLeft" size={22} color={HEADING} />
        </IconButton>
        <Typography sx={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 800, color: HEADING }}>Loan Restructuring</Typography>
        <Box sx={{ width: 38 }} />
      </Box>

      <Box className="scroll-content" sx={{ flex: 1, px: 3, pb: 3, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Intro */}
        <Box sx={{ bgcolor: '#EAF1FC', borderRadius: '12px', p: '14px 16px' }}>
          <Typography sx={{ fontSize: 13, color: '#2B4A7E', lineHeight: 1.5 }}>
            For temporary hardship. An officer reviews every request — nothing changes until approved.
          </Typography>
        </Box>

        {/* 1 · Client information */}
        <Box>
          <SectionHead n={1} label="CLIENT INFORMATION" tag="on file" />
          <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: '14px 16px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 42, height: 42, borderRadius: '50%', bgcolor: '#E7F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 800, color: BLUE }}>SD</Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 800, color: HEADING }}>Mr. Sok Dara</Typography>
              <Typography sx={{ fontSize: 12.5, color: MUTED }}>National ID ···040 · 012 345 678</Typography>
            </Box>
          </Box>
        </Box>

        {/* 2 · Reason for restructuring */}
        <Box>
          <SectionHead n={2} label="REASON FOR RESTRUCTURING" />
          <Box component="select" value={reason} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReason(e.target.value)} sx={{ ...fieldSx, color: reason ? HEADING : '#A8B0BD' }}>
            <option value="">Select reason…</option>
            {REASONS.map((r) => (
              <option key={r} value={r} style={{ color: HEADING }}>{r}</option>
            ))}
          </Box>
          <Box
            component="textarea"
            value={details}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetails(e.target.value)}
            placeholder="Additional details (optional)"
            rows={3}
            sx={{ ...fieldSx, height: 'auto', py: 1.5, mt: 1.5, resize: 'none', lineHeight: 1.5, '&::placeholder': { color: '#A8B0BD' } }}
          />
        </Box>

        {/* 3 · Loan information */}
        <Box>
          <SectionHead n={3} label="LOAN INFORMATION" />
          <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: '14px 16px' }}>
            <LoanRow label="Loan Outstanding" value="$2,000.00" />
            <LoanRow label="Total Unpaid Obligation" value="$160.00" danger />
            <Box sx={{ borderTop: '1px dashed #E2E6EC', my: 1 }} />
            <Typography sx={{ fontSize: 12, color: MUTED }}>Final amounts are set by NH at approval.</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <FieldLabel>Extend term by (months)</FieldLabel>
            <Box component="input" type="number" value={extend} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExtend(e.target.value)} sx={fieldSx} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FieldLabel>Grace period (months)</FieldLabel>
            <Box component="input" type="number" value={grace} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrace(e.target.value)} sx={fieldSx} />
          </Box>
        </Box>
      </Box>

      {/* Submit */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: '40px', bgcolor: '#F5F5F5' }}>
        <Box sx={{ display: 'flex', gap: 1, bgcolor: '#FBF6EC', borderRadius: '12px', p: '12px 14px', mb: 1.5 }}>
          <Box sx={{ mt: '1px' }}><Icon name="info" size={16} color="#C47F11" /></Box>
          <Typography sx={{ fontSize: 12, color: '#7A5A12', lineHeight: 1.45 }}>
            By submitting this request, I agree to the terms and conditions, including NH sharing my information with CBC. <Box component="span" sx={{ fontWeight: 800 }}>Final terms are confirmed during assessment.</Box>
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/restructure-success')}
          sx={{ height: 54, borderRadius: '14px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
        >
          Submit Request
        </Button>
      </Box>
    </Box>
  )
}
