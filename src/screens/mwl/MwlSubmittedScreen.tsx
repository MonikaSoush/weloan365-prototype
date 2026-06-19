import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../../components/Icon'
import { AssetImg, asset } from '../../components/home/media'
import { BLUE } from './MwlParts'
import { useGuarantorProgress, setGuarantorProgress } from '../../workspace/guarantorProgress'
import { addApplication, hasApplication, reviewQuery, type LoanApplication } from '../../workspace/applications'

// The MWL application this screen represents — added to My Loans (In Review)
// when the borrower taps "Track My Application".
const MWL_APP: LoanApplication = {
  title: 'Migrant Worker Loan',
  amount: '$2,000.00',
  term: '12 months',
  rate: '1.50%/mo',
  ref: 'MWL-2026-160781',
  on: '18 Jun 2026',
  track: true,
}

// ─────────────────────────────────────────────────────────────────────────────
// MWL application submitted — guarantor SMS sent / pending confirmation.
// Mascot space is reserved (drop /assets/illustrations/mwl-submitted.png in).
// ─────────────────────────────────────────────────────────────────────────────
const GREEN = '#1FA85C'
const MUTED = '#8A94A6'
const AMBER = '#C47F11'
const AMBER_ACTIVE = '#F1A009' // current (active) step circle
const TAN = '#F3E7CE' // pending step circle
const TAN_TEXT = '#C79A3A' // pending step number

const STEPS = ['Open SMS\nLink', 'Review Loan', 'Confirm as\nGuarantor']
const IDLE = '#E2E6EC'

// progress = number of completed steps. Step i: done (i<p) · active (i===p) · pending (i>p).
// Connector j (between step j and j+1): done if behind the active step, active (flows) if
// it's the active step's outgoing line, idle otherwise.
function connectorState(j: number, progress: number): 'done' | 'active' | 'idle' {
  if (j < progress) return 'done'
  if (j === progress) return 'active'
  return 'idle'
}

export default function MwlSubmittedScreen() {
  const navigate = useNavigate()
  // Progress is driven by the guarantor's real web-flow position (shared store).
  const progress = useGuarantorProgress()
  const done = progress >= STEPS.length

  // Register the application in My Loans (In Review) and open its tracker.
  const trackApplication = () => {
    if (!hasApplication(MWL_APP.ref)) addApplication(MWL_APP)
    navigate(`/mwl-tracker?${reviewQuery(MWL_APP)}`)
  }

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <Box sx={{ px: 3, pt: 3, pb: 3, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 'calc(100% + 150px)', boxSizing: 'border-box' }}>
          {/* Status */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon name="checkCircle" size={20} color={GREEN} />
              <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#0B0F1A' }}>{done ? 'Application Received' : 'Submitted · Pending Guarantor Confirmation'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mt: 0.5, pl: '28px' }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: BLUE }}>Reference: MWL-2026-160781</Typography>
              <Typography sx={{ fontSize: 12, color: MUTED }}>just now</Typography>
            </Box>
          </Box>

          {/* Mascot illustration — reserved space */}
          <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '16px', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <AssetImg
              src={asset(done ? 'illustrations/mascot_done.png' : 'illustrations/mascot_waiting.png')}
              alt=""
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              fallback={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, color: '#C9D2DE' }}>
                  <Icon name="image" size={44} color="#C9D2DE" />
                  <Typography sx={{ fontSize: 12, color: '#B4BCC9' }}>{done ? 'mascot_done.png' : 'mascot_waiting.png'}</Typography>
                </Box>
              }
            />
          </Box>

          {/* Guarantor SMS sent */}
          <Box sx={{ bgcolor: done ? '#EAF7EF' : '#F6F7F9', border: `1px solid ${done ? '#BFE6CF' : '#EAECEF'}`, borderRadius: '16px', p: '16px', display: 'flex', flexDirection: 'column', gap: 1.75, transition: 'background-color 0.3s, border-color 0.3s' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.6px', color: done ? '#5B8E6F' : MUTED }}>GUARANTOR SMS SENT</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: '#F2C94C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#7A5B00' }}>CD</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>Chan Dara</Typography>
                <Typography sx={{ fontSize: 12.5, color: MUTED }}>+855 12•••678</Typography>
              </Box>
              {done ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Icon name="check" size={15} color={GREEN} />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: GREEN }}>Confirmed</Typography>
                </Box>
              ) : (
                <Box sx={{ bgcolor: '#FBEBC6', borderRadius: '999px', px: 1.25, py: '3px' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: AMBER }}>Pending</Typography>
                </Box>
              )}
            </Box>

            {/* 3-step progress — driven by the guarantor's real position.
                The connector leading to the next pending step flows on a loop. */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 0.5 }}>
              {STEPS.map((label, i) => {
                const stepState = i < progress ? 'done' : i === progress ? 'active' : 'pending'
                const conn = connectorState(i, progress) // connector after this step
                return (
                  <Fragment key={label}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 84, flexShrink: 0 }}>
                      <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s', bgcolor: stepState === 'done' ? GREEN : stepState === 'active' ? AMBER_ACTIVE : TAN }}>
                        {stepState === 'done' ? (
                          <Icon name="check" size={15} color="#fff" />
                        ) : (
                          <Typography sx={{ fontSize: 12.5, fontWeight: 800, color: stepState === 'active' ? '#fff' : TAN_TEXT }}>{i + 1}</Typography>
                        )}
                      </Box>
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#3A4256', textAlign: 'center', mt: 0.5, lineHeight: 1.25, whiteSpace: 'pre-line' }}>{label}</Typography>
                    </Box>
                    {i < STEPS.length - 1 && (
                      <Box
                        sx={{
                          flex: 1,
                          height: 3,
                          borderRadius: '2px',
                          mt: '13px',
                          mx: 0.5,
                          ...(conn === 'done'
                            ? { bgcolor: GREEN }
                            : conn === 'active'
                            ? {
                                backgroundImage: `linear-gradient(90deg, ${IDLE} 0%, ${IDLE} 35%, ${GREEN} 50%, ${IDLE} 65%, ${IDLE} 100%)`,
                                backgroundSize: '250% 100%',
                                animation: 'guarantorFlow 1.4s linear infinite',
                                '@keyframes guarantorFlow': {
                                  '0%': { backgroundPosition: '120% 0' },
                                  '100%': { backgroundPosition: '-120% 0' },
                                },
                              }
                            : { bgcolor: IDLE }),
                        }}
                      />
                    )}
                  </Fragment>
                )
              })}
            </Box>

            <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: done ? GREEN : MUTED, transition: 'color 0.3s' }}>
              {done
                ? 'Guarantor confirmed — application moving to Assessment.'
                : progress === 0
                ? 'Waiting · SMS sent to guarantor.'
                : 'Guarantor in progress — confirming the loan.'}
            </Typography>
          </Box>

          {/* SIM controls — demo tools, kept below the fold (scroll to reveal) */}
          <Box sx={{ mt: 'auto', pt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.5px', color: '#9AA3B2' }}>SIM</Typography>
            <Box role="button" onClick={() => { setGuarantorProgress(3); navigate('/mwl-contract') }} sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff', border: '1px solid #E2E6EC', borderRadius: '10px', height: 40, cursor: 'pointer', '&:active': { opacity: 0.7 } }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0B0F1A' }}>Guarantor Confirmed ↗</Typography>
            </Box>
            <Box role="button" onClick={() => navigate('/guarantor-sms')} sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: BLUE, borderRadius: '10px', height: 40, cursor: 'pointer', '&:active': { opacity: 0.7 } }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Guarantor view ↗</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bottom actions */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: '40px', bgcolor: '#F5F5F5', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Button variant="contained" fullWidth onClick={trackApplication} sx={{ height: 54, borderRadius: '14px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}>
          Track My Application
        </Button>
        <Button variant="text" fullWidth onClick={() => navigate('/products')} sx={{ height: 44, fontSize: 15, fontWeight: 700, color: BLUE }}>
          Browse Loans
        </Button>
      </Box>
    </Box>
  )
}
