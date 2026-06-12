import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Icon } from '../components/Icon'

interface PhoneCanvasProps {
  children: ReactNode
}

// Phone column width for the desktop prototype frame.
const PHONE_W = 388

export default function PhoneCanvas({ children }: PhoneCanvasProps) {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        // ── Fill the full viewport height on every breakpoint ───────────────
        position: { xs: 'fixed', md: 'relative' },
        inset: { xs: 0, md: 'auto' },

        width: { xs: '100%', md: PHONE_W },
        height: '100dvh',

        bgcolor: 'background.default',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,

        // ── Uniform 54px top inset for every screen ─────────────────────────
        pt: '54px',

        // ── Workspace: light, rounded prototype frame (desktop only) ────────
        borderRadius: { xs: 0, md: '40px' },
        boxShadow: {
          xs: 'none',
          md: '0 24px 60px rgba(16,24,40,0.18), 0 0 0 1px rgba(16,24,40,0.04)',
        },
      }}
    >
      {children}

      {/* Floating reset FAB — jumps back to the Select-User-Flow screen. */}
      <Box
        onClick={() => navigate('/flow-select')}
        role="button"
        aria-label="Restart from Select User Flow"
        sx={{
          position: 'absolute',
          right: 16,
          bottom: 84,
          zIndex: 60,
          width: 52,
          height: 52,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(39,92,178,0.4)',
          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
          '&:active': { transform: 'scale(0.94)' },
        }}
      >
        <Icon name="redo" size={24} color="#fff" />
      </Box>
    </Box>
  )
}
