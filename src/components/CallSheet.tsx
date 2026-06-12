import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from './Icon'

// ─────────────────────────────────────────────────────────────────────────────
// CallSheet — shared bottom sheet for the "Call NongHyup Finance" support line.
// Used by every header Call icon across the app (product + loan detail screens).
// ─────────────────────────────────────────────────────────────────────────────
const LABEL = '#737373'
const VALUE = '#171717'
const BRAND = '#275CB2'
const HOTLINE = '017 666 036'

export default function CallSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 100,
          bgcolor: 'rgba(11,15,26,0.45)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />
      {/* Sheet */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 101,
          bgcolor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -8px 30px rgba(11,15,26,0.18)',
          px: 3,
          pt: 1.25,
          pb: '32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Drag handle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
          <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: '#D6DBE2' }} />
        </Box>

        <Typography sx={{ fontSize: 20, fontWeight: 800, color: VALUE, textAlign: 'center' }}>Call NongHyup Finance</Typography>
        <Typography sx={{ fontSize: 13.5, color: LABEL, textAlign: 'center', mt: 0.5 }}>Tap the number to call our support line</Typography>

        {/* Tappable number → places the call */}
        <Box
          component="a"
          href={`tel:${HOTLINE.replace(/\s/g, '')}`}
          sx={{
            mt: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.25,
            minHeight: 60,
            borderRadius: '14px',
            bgcolor: '#EEF3FC',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:active': { opacity: 0.85 },
          }}
        >
          <Icon name="phone" size={22} color={BRAND} />
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: BRAND, letterSpacing: '0.5px' }}>{HOTLINE}</Typography>
        </Box>
        <Typography sx={{ fontSize: 12, color: LABEL, textAlign: 'center', mt: 1.25 }}>Support hotline · available 24/7</Typography>

        {/* Cancel */}
        <Box
          role="button"
          onClick={onClose}
          sx={{ mt: 2, minHeight: 52, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:active': { opacity: 0.7 } }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: VALUE }}>Cancel</Typography>
        </Box>
      </Box>
    </>
  )
}
