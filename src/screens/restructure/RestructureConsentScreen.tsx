import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../../components/Icon'
import { MwlHeader, MwlTitle, BLUE } from '../mwl/MwlParts'

// ─────────────────────────────────────────────────────────────────────────────
// Request Restructure · Step 3/3 — Credit bureau consent
// ─────────────────────────────────────────────────────────────────────────────
export default function RestructureConsentScreen() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(true)

  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <MwlHeader onBack={() => navigate('/restructure-conditions')} step={3} totalSteps={3} />
        <MwlTitle>Credit bureau consent</MwlTitle>

        <Box sx={{ px: 3, pb: 3, pt: 1.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Consent text card */}
          <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: '16px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.6px', color: '#8A94A6' }}>CONSENT — V3.2</Typography>
            <Typography sx={{ fontSize: 14, color: '#3A4256', lineHeight: 1.6 }}>
              I, <B>Mr. Sok Dara</B> (NID 010 203 040), authorize <B>NHFC</B> to retrieve my credit information from
              Credit Bureau Cambodia (CBC) for the purpose of evaluating my loan restructure request <B>#NH-2025-03114</B>.
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#3A4256', lineHeight: 1.6 }}>
              I understand that CBC may share my repayment history with other licensed lenders. This consent
              is bound to this device and timestamped.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: BLUE }}>Privacy disclosure</Typography>
              <Icon name="chevronDown" size={16} color={BLUE} />
            </Box>
          </Box>

          {/* Your consent */}
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.6px', color: '#8A94A6', mb: 1 }}>YOUR CONSENT</Typography>
            <Box
              onClick={() => setAgreed((v) => !v)}
              role="button"
              sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: '16px', display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '7px',
                  flexShrink: 0,
                  bgcolor: agreed ? BLUE : '#fff',
                  border: agreed ? `1px solid ${BLUE}` : '2px solid #C9D2DE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {agreed && <Icon name="check" size={15} color="#fff" />}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>I agree (Consent Status: Agreed)</Typography>
                <Typography sx={{ fontSize: 12, color: '#8A94A6', mt: 0.25 }}>Timestamped today · 27 May 2026</Typography>
              </Box>
            </Box>
          </Box>

          {/* Customer declaration */}
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.6px', color: '#8A94A6', mb: 1 }}>CUSTOMER DECLARATION</Typography>
            <Box sx={{ bgcolor: '#EAF1FC', borderRadius: '12px', p: '16px' }}>
              <Typography sx={{ fontSize: 14, color: '#3A4256', lineHeight: 1.6 }}>
                Everything I provided is true and complete, I genuinely need this restructure, I understand
                the new terms, I will keep my contact info up to date, I understand approval is not guaranteed
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexShrink: 0, px: 3, pt: 2.5, pb: '44px', bgcolor: '#F5F5F5' }}>
        <Button
          variant="contained"
          fullWidth
          disabled={!agreed}
          onClick={() => navigate('/restructure-success')}
          sx={{ height: 48, borderRadius: '12px', fontSize: 14, fontWeight: 700 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

function B({ children }: { children: React.ReactNode }) {
  return <Box component="span" sx={{ fontWeight: 800, color: '#0B0F1A' }}>{children}</Box>
}
