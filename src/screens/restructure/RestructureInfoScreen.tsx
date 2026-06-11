import { useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MwlHeader, MwlTitle, MwlFooter, GroupLabel, SelectField } from '../mwl/MwlParts'

// ─────────────────────────────────────────────────────────────────────────────
// Request Restructure · Step 1/3 — Your information
// Reached by tapping "Request Restructure" on the Loan Detail screen.
// ─────────────────────────────────────────────────────────────────────────────
const REASONS = ['Family emergency', 'Lost income', 'Medical expense', 'Business slowdown', 'Other']

export default function RestructureInfoScreen() {
  const navigate = useNavigate()
  const [reason, setReason] = useState('Family emergency')
  const [comment, setComment] = useState('')

  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <MwlHeader onBack={() => navigate('/my-loan-detail')} step={1} totalSteps={3} />
        <MwlTitle>Your information</MwlTitle>

        <Box sx={{ px: 3, pb: 3, pt: 1.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Active loan summary card */}
          <Box sx={{ background: 'linear-gradient(160deg, #1C5BD6 0%, #0A47B0 100%)', borderRadius: '16px', p: '18px', color: '#fff' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', color: 'rgba(255,255,255,0.75)' }}>
              YOUR ACTIVE LOAN
            </Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', mt: 0.25, color: '#fff' }}>$2,000.00</Typography>
            <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', mt: 0.25 }}>
              NH-2025-03114 · Migrant Worker Loan
            </Typography>
            <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.18)', my: 1.75 }} />
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Next payment</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, mt: 0.25, color: '#fff' }}>$215 · 12 Jun</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Status</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, mt: 0.25, color: '#fff' }}>2 missed</Typography>
              </Box>
            </Box>
          </Box>

          {/* Customer info */}
          <Box>
            <GroupLabel>CUSTOMER INFO</GroupLabel>
            <Box sx={{ bgcolor: '#fff', borderRadius: '12px', px: '16px' }}>
              <InfoRow label="Full Name" value="Sophea Kim" />
              <InfoRow label="Date of birth" value="15 / 08 / 1990" />
              <InfoRow label="Phone" value="093 333 333" />
              <InfoRow label="Address" value="#24D, St232, Sangkat Toek Tla, Khan SenSok, Phnom Penh" />
              <InfoRow label="Current occupation" value="Garment worker" />
              <InfoRow label="Status" value="Married" last />
            </Box>
          </Box>

          {/* Reason + comment */}
          <SelectField label="Reason Restructure" options={REASONS} value={reason} onChange={setReason} />
          <Box
            component="textarea"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            placeholder="Enter your comment"
            rows={4}
            sx={{
              width: '100%',
              boxSizing: 'border-box',
              bgcolor: '#fff',
              border: 'none',
              borderRadius: '12px',
              p: '16px',
              fontSize: 16,
              fontFamily: 'inherit',
              color: '#0B0F1A',
              resize: 'none',
              outline: 'none',
              '&::placeholder': { color: '#8A94A6' },
            }}
          />
        </Box>
      </Box>

      <MwlFooter onNext={() => navigate('/restructure-conditions')} />
    </Box>
  )
}

function InfoRow({ label, value, last }: { label: string; value: ReactNode; last?: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        py: '14px',
        borderBottom: last ? 'none' : '1px solid #F0F0F0',
      }}
    >
      <Typography sx={{ fontSize: 13, color: '#8A94A6', flexShrink: 0, pt: '1px' }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A', textAlign: 'right' }}>{value}</Typography>
    </Box>
  )
}
