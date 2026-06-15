import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon, IconName } from '../components/Icon'
import { useFlow, UserFlow } from '../workspace/FlowContext'
import { useSample, SAMPLES } from '../workspace/SampleContext'

// ─────────────────────────────────────────────────────────────────────────────
// Flow picker — the very first screen. Choosing a persona sets the user flow
// (persisted to localStorage) and continues to the Splash screen.
// ─────────────────────────────────────────────────────────────────────────────
const OPTIONS: { flow: UserFlow; icon: IconName; title: string; sub: string }[] = [
  { flow: 'Visitor', icon: 'eye', title: 'Visitor', sub: 'Just browsing — not signed in' },
  { flow: 'New User', icon: 'idCard', title: 'New User', sub: 'Signed in — no loans yet' },
  { flow: 'Applicant', icon: 'clock', title: 'Applicant', sub: 'Application in progress' },
  { flow: 'Borrower', icon: 'myLoan', title: 'Borrower', sub: 'Has one or more active loans' },
]

export default function FlowSelectScreen() {
  const navigate = useNavigate()
  const { setFlow } = useFlow()
  const { sample, setSample } = useSample()

  const choose = (f: UserFlow) => {
    setFlow(f)
    navigate('/splash')
  }

  return (
    <Box
      className="screen-enter"
      sx={{
        height: 'calc(100% + 34px)',
        mt: '-34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(165deg, #1C4DB8 0%, #0A3A9E 100%)',
        px: 3,
      }}
    >
      <Box
        component="img"
        src="/assets/brand/logo_white.png"
        alt="NongHyup Finance (Cambodia) Plc"
        sx={{ width: 180, height: 'auto', display: 'block', mx: 'auto', mb: 4 }}
      />

      {/* Global sample segmented control: Sample 1 (with nav) / Sample 2 (no nav) */}
      <Box sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.15)', borderRadius: '12px', p: 0.5, gap: 0.5, mb: 3 }}>
        {SAMPLES.map((s) => {
          const active = s.id === sample
          // Sample 2 is not ready yet — show a "Coming soon" badge and block selection.
          const disabled = s.id === '2'
          return (
            <Box
              key={s.id}
              onClick={() => { if (!disabled) setSample(s.id) }}
              aria-disabled={disabled}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.25,
                py: 1.25,
                borderRadius: '9px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: 14,
                fontWeight: 700,
                opacity: disabled ? 0.45 : 1,
                color: active ? '#1C4DB8' : 'rgba(255,255,255,0.85)',
                bgcolor: active ? '#fff' : 'transparent',
                transition: 'all 0.12s',
              }}
            >
              {s.label}
              {disabled && (
                <Box component="span" sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
                  Coming soon
                </Box>
              )}
            </Box>
          )
        })}
      </Box>

      <Typography sx={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', color: 'rgba(255,255,255,0.6)', textAlign: 'center', textTransform: 'uppercase' }}>
        Select user flow
      </Typography>
      <Typography sx={{ fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', mt: 0.5, mb: 3.5, letterSpacing: '-0.5px' }}>
        How should we open the app?
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {OPTIONS.map((o) => (
          <Box
            key={o.flow}
            onClick={() => choose(o.flow)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: '#fff',
              borderRadius: '16px',
              px: 2.5,
              py: 2,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              transition: 'transform 0.12s ease, box-shadow 0.12s ease',
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                flexShrink: 0,
                bgcolor: '#EEF3FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name={o.icon} size={24} color="#1C4DB8" />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#0B0F1A' }}>{o.title}</Typography>
              <Typography sx={{ fontSize: 13, color: '#8A94A6', mt: 0.25 }}>{o.sub}</Typography>
            </Box>
            <Icon name="chevronRight" size={20} color="#C9D2DE" />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
