import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'

const BLUE = '#275CB2'
const MUTED = '#8A94A6'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'back']

// Reusable 4-digit PIN entry — lock badge, title, dot indicator, numeric keypad.
export default function PinView({
  title,
  subtitle,
  onBack,
  onComplete,
  onSkip,
}: {
  title: string
  subtitle: string
  onBack: () => void
  onComplete: () => void
  onSkip?: () => void
}) {
  const [pin, setPin] = useState('')

  useEffect(() => {
    if (pin.length === 4) {
      const t = setTimeout(onComplete, 180)
      return () => clearTimeout(t)
    }
  }, [pin, onComplete])

  const press = (k: string) => {
    if (k === 'C') return setPin('')
    if (k === 'back') return setPin((p) => p.slice(0, -1))
    setPin((p) => (p.length >= 4 ? p : p + k))
  }

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box sx={{ px: 3, pt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton onClick={onBack} aria-label="Back" sx={{ ml: -1, color: '#0B0F1A' }}>
          <Icon name="chevronLeft" size={26} color="#0B0F1A" />
        </IconButton>
        {onSkip && (
          <Typography
            component="button"
            onClick={onSkip}
            sx={{ border: 'none', bgcolor: 'transparent', fontSize: 15, fontWeight: 600, color: MUTED, cursor: 'pointer', p: 0, mr: -0.5 }}
          >
            Skip
          </Typography>
        )}
      </Box>

      {/* Lock badge + title */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 3, mt: 1 }}>
        <Box component="img" src="/assets/brand/four_pin.svg" alt="" sx={{ width: 80, height: 80, mb: 1 }} />
        <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#0B0F1A', letterSpacing: 2, mt: 0.5, mb: 1.5 }}>***</Typography>
        <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.5px', textAlign: 'center' }}>{title}</Typography>
        <Typography sx={{ fontSize: 15, color: MUTED, mt: 1, textAlign: 'center', lineHeight: 1.4 }}>{subtitle}</Typography>

        {/* Dots */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          {[0, 1, 2, 3].map((i) => (
            <Box key={i} sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: i < pin.length ? BLUE : 'transparent', border: `2px solid ${i < pin.length ? BLUE : '#CBD3DF'}` }} />
          ))}
        </Box>
      </Box>

      {/* Keypad */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
        <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 1, px: 3, pb: '40px' }}>
          {KEYS.map((k) => (
            <Box key={k} component="button" type="button" onClick={() => press(k)} aria-label={k === 'back' ? 'Delete' : k}
              sx={{ height: 64, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'transparent', border: 'none', fontFamily: 'inherit', fontSize: 30, fontWeight: 500, color: '#0B0F1A', cursor: 'pointer', borderRadius: '50%', '&:active': { bgcolor: 'rgba(11,15,26,0.06)' } }}>
              {k === 'back' ? <Box component="img" src="/assets/brand/clear.svg" alt="Delete" sx={{ width: 26, height: 26 }} /> : k === 'C' ? <Box component="span" sx={{ opacity: 0.5 }}>C</Box> : k}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
