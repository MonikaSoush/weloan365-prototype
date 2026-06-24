import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Icon } from '../components/Icon'
import { usePinGate } from './PinGateContext'

interface PhoneCanvasProps {
  children: ReactNode
}

// Phone column width for the desktop prototype frame.
const PHONE_W = 388

// Floating reset FAB geometry.
const FAB_SIZE = 52
const EDGE_GAP = 16 // keep this much breathing room from the canvas edges
const DRAG_THRESHOLD = 4 // px of movement before a press counts as a drag (not a tap)

export default function PhoneCanvas({ children }: PhoneCanvasProps) {
  const navigate = useNavigate()
  const { lock } = usePinGate()
  const canvasRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLDivElement>(null)

  // FAB top-left position in px, relative to the canvas. null = not yet measured.
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)

  // Mutable drag bookkeeping that must not trigger re-renders.
  const drag = useRef({ active: false, moved: false, offsetX: 0, offsetY: 0 })

  // Clamp a candidate position so the FAB always stays fully inside the canvas.
  const clamp = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    const maxX = (canvas?.clientWidth ?? PHONE_W) - FAB_SIZE - EDGE_GAP
    const maxY = (canvas?.clientHeight ?? 0) - FAB_SIZE - EDGE_GAP
    return {
      x: Math.max(EDGE_GAP, Math.min(x, maxX)),
      y: Math.max(EDGE_GAP, Math.min(y, maxY)),
    }
  }, [])

  // Seed the FAB at the bottom-right corner once the canvas is measured.
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    setPos({
      x: canvas.clientWidth - FAB_SIZE - EDGE_GAP,
      y: canvas.clientHeight - FAB_SIZE - 84,
    })
  }, [])

  // Keep the FAB inside the canvas when the viewport / frame resizes.
  useEffect(() => {
    const onResize = () => setPos((p) => (p ? clamp(p.x, p.y) : p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [clamp])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current
    const fab = fabRef.current
    if (!canvas || !fab) return
    const fabRect = fab.getBoundingClientRect()
    drag.current = {
      active: true,
      moved: false,
      offsetX: e.clientX - fabRect.left,
      offsetY: e.clientY - fabRect.top,
    }
    fab.setPointerCapture(e.pointerId)
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const nextX = e.clientX - rect.left - drag.current.offsetX
    const nextY = e.clientY - rect.top - drag.current.offsetY
    if (
      Math.abs(nextX - (pos?.x ?? nextX)) > DRAG_THRESHOLD ||
      Math.abs(nextY - (pos?.y ?? nextY)) > DRAG_THRESHOLD
    ) {
      drag.current.moved = true
    }
    setPos(clamp(nextX, nextY))
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    fabRef.current?.releasePointerCapture(e.pointerId)
    setDragging(false)
    // A press with no real movement is a tap → reset to first-time state and go to flow select.
    if (!drag.current.moved) {
      localStorage.removeItem('weloan-staff-registered')
      lock()
      navigate('/flow-select')
    }
  }

  return (
    <Box
      ref={canvasRef}
      id="phone-canvas"
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

        // ── Uniform 34px top inset for every screen ─────────────────────────
        pt: '34px',

        // ── Workspace: light, rounded prototype frame (desktop only) ────────
        borderRadius: { xs: 0, md: '40px' },
        boxShadow: {
          xs: 'none',
          md: '0 24px 60px rgba(16,24,40,0.18), 0 0 0 1px rgba(16,24,40,0.04)',
        },
      }}
    >
      {children}

      {/* Floating reset FAB — drag it anywhere; tap to jump back to Select User Flow. */}
      <Box
        ref={fabRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="button"
        aria-label="Restart from Select User Flow"
        sx={{
          position: 'absolute',
          left: pos ? pos.x : 'auto',
          top: pos ? pos.y : 'auto',
          right: pos ? 'auto' : EDGE_GAP,
          bottom: pos ? 'auto' : 84,
          zIndex: 60,
          width: FAB_SIZE,
          height: FAB_SIZE,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
          // ── Frosted glass: blur whatever is behind, minimal neutral tint ──
          overflow: 'hidden',
          bgcolor: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(18px) saturate(160%)',
          WebkitBackdropFilter: 'blur(18px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.55)',
          boxShadow: dragging
            ? '0 14px 34px rgba(16,24,40,0.20), inset 0 1px 1px rgba(255,255,255,0.65)'
            : '0 8px 22px rgba(16,24,40,0.14), inset 0 1px 1px rgba(255,255,255,0.55)',
          // Smooth settle when released / clamped; instant tracking while dragging.
          transition: dragging
            ? 'none'
            : 'left 0.28s cubic-bezier(0.22,1,0.36,1), top 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease, transform 0.12s ease',
          transform: dragging ? 'scale(1.08)' : 'scale(1)',
          '&:active': { transform: dragging ? 'scale(1.08)' : 'scale(0.94)' },
        }}
      >
        <Icon name="redo" size={24} color="#275CB2" />
      </Box>
    </Box>
  )
}
