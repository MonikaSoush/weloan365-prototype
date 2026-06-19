import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from './Icon'
import { AssetImg, BANKS } from './home/media'

// ─────────────────────────────────────────────────────────────────────────────
// Pay loan — bottom sheet opened from any active-loan "Pay" button.
// Lists payment methods (KHQR + partner banks); selecting KHQR reveals the
// scan-to-pay QR card. Bank logos come from /assets/banks.
// ─────────────────────────────────────────────────────────────────────────────
const BLUE = '#275CB2'
const HEADING = '#0B0F1A'
const MUTED = '#8A94A6'

type MethodId = 'khqr' | 'aba' | 'acleda' | 'ppcb' | 'wing'

type Method = { id: MethodId; label: string; icon: string }

const METHODS: Method[] = [
  { id: 'khqr', label: 'បង់តាម KHQR', icon: BANKS.khqr },
  { id: 'aba', label: 'ធនាគារ អេប៊ីអេ', icon: BANKS.aba },
  { id: 'acleda', label: 'ធនាគារ អេស៊ីលីដ', icon: BANKS.acleda },
  { id: 'ppcb', label: 'ធនាគារ ភីភីស៊ីប៊ី', icon: BANKS.ppcb },
  { id: 'wing', label: 'ធនាគារ វីង', icon: BANKS.wing },
]

const KH = `'Noto Sans Khmer', sans-serif`

const KHR_RATE = 4100 // 1 USD ≈ 4,100 ៛

export default function PayLoanSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<MethodId | null>(null)
  const [amount, setAmount] = useState('320.00')
  const [cur, setCur] = useState<'USD' | 'KHR'>('USD')

  // The sheet stays mounted (renders null when closed), so reset the choice
  // each time it re-opens — every visit starts with nothing selected.
  useEffect(() => {
    if (open) {
      setSelected(null)
      setAmount('320.00')
      setCur('USD')
    }
  }, [open])

  // Switching currency converts the current amount at the demo rate.
  const switchCur = (next: 'USD' | 'KHR') => {
    if (next === cur) return
    const n = parseFloat(amount.replace(/,/g, '')) || 0
    setAmount(next === 'KHR' ? Math.round(n * KHR_RATE).toLocaleString('en-US') : (n / KHR_RATE).toFixed(2))
    setCur(next)
  }
  const symbol = cur === 'USD' ? '$' : '៛'

  if (!open) return null

  return (
    <Box sx={{ position: 'absolute', inset: 0, zIndex: 1300, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(15,20,30,0.45)',
          animation: 'payFade 0.2s ease-out',
          '@keyframes payFade': { from: { opacity: 0 }, to: { opacity: 1 } },
        }}
      />

      {/* Sheet */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#fff',
          borderTopLeftRadius: '22px',
          borderTopRightRadius: '22px',
          maxHeight: '92%',
          display: 'flex',
          flexDirection: 'column',
          animation: 'paySlide 0.28s cubic-bezier(0.22,1,0.36,1)',
          '@keyframes paySlide': { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        }}
      >
        {/* Grab handle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.25 }}>
          <Box sx={{ width: 40, height: 5, borderRadius: 3, bgcolor: '#D5D9E0' }} />
        </Box>

        {/* Header */}
        <Box sx={{ px: 3, pt: 1.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 26, fontWeight: 800, color: HEADING, letterSpacing: '-0.5px' }}>Pay loan</Typography>
          <IconButton onClick={onClose} aria-label="Close" sx={{ bgcolor: '#fff', width: 34, height: 34, mt: 0.5, '&:hover': { bgcolor: '#EDEFF2' } }}>
            <Icon name="close" size={20} color="#0B0F1A" />
          </IconButton>
        </Box>

        {/* Scrollable body */}
        <Box sx={{ px: 3, pt: 1, pb: 2, overflowY: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          {/* Amount */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.7px', color: MUTED }}>
              AMOUNT
            </Typography>
            <Box sx={{ display: 'flex', bgcolor: '#EFF1F4', borderRadius: '999px', p: '3px' }}>
              {(['USD', 'KHR'] as const).map((c) => (
                <Box
                  key={c}
                  role="button"
                  onClick={() => switchCur(c)}
                  sx={{ minWidth: 30, textAlign: 'center', px: 1.25, py: '4px', borderRadius: '999px', cursor: 'pointer', bgcolor: cur === c ? '#fff' : 'transparent', boxShadow: cur === c ? '0 1px 3px rgba(0,0,0,0.12)' : 'none' }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 800, color: cur === c ? HEADING : MUTED }}>{c === 'USD' ? '$' : '៛'}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, border: '1px solid #E8EAEE', borderRadius: '14px', px: 2, height: 56, mb: 2.5 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: HEADING }}>{symbol}</Typography>
            <Box
              component="input"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              sx={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', bgcolor: 'transparent', fontFamily: 'inherit', fontSize: 22, fontWeight: 800, color: HEADING }}
            />
          </Box>

          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.7px', color: MUTED, mb: 1 }}>
            PAYMENT METHOD
          </Typography>

          <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '14px', overflow: 'hidden' }}>
            {METHODS.map((m, i) => {
              const isSelected = selected === m.id
              const showQr = m.id === 'khqr' && isSelected
              return (
                <Box key={m.id}>
                  <MethodRow
                    method={m}
                    selected={isSelected}
                    divider={i < METHODS.length - 1}
                    onSelect={() => setSelected(m.id)}
                  />
                  {showQr && <KhqrPanel amount={amount} cur={cur} />}
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ px: 3, pt: 1.5, pb: '34px', bgcolor: '#fff' }}>
          <Button
            variant="contained"
            fullWidth
            disabled={!selected}
            onClick={onClose}
            startIcon={<Icon name="cash" size={18} />}
            sx={{
              height: 52,
              borderRadius: '14px',
              p: '10px',
              fontSize: 16,
              fontWeight: 700,
              bgcolor: BLUE,
              '&.Mui-disabled': { bgcolor: '#A9C3EC', color: '#fff' },
            }}
          >
            {amount ? `Pay ${symbol}${amount}` : 'Pay Now'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

function MethodRow({ method, selected, divider, onSelect }: { method: Method; selected: boolean; divider?: boolean; onSelect: () => void }) {
  return (
    <Box
      onClick={onSelect}
      role="button"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: '14px',
        cursor: 'pointer',
        borderBottom: divider ? '1px solid #F1F4F8' : 'none',
        '&:active': { bgcolor: '#F8FAFC' },
      }}
    >
      <Box sx={{ width: 30, height: 30, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AssetImg
          src={method.icon}
          alt=""
          sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          fallback={<Box sx={{ width: 26, height: 26, borderRadius: '6px', bgcolor: '#E7ECF2' }} />}
        />
      </Box>
      <Typography sx={{ flex: 1, minWidth: 0, fontFamily: KH, fontSize: 15, fontWeight: 600, color: HEADING }}>
        {method.label}
      </Typography>
      <Radio selected={selected} />
    </Box>
  )
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <Box
      sx={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        flexShrink: 0,
        border: selected ? `6px solid ${BLUE}` : '2px solid #CBD2DC',
        bgcolor: '#fff',
        transition: 'border 0.15s',
      }}
    />
  )
}

// ─── KHQR scan-to-pay panel ──────────────────────────────────────────────────
function KhqrPanel({ amount, cur }: { amount: string; cur: 'USD' | 'KHR' }) {
  return (
    <Box sx={{ px: 2, pb: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: HEADING }}>Scan to pay</Typography>

      {/* KHQR card artwork — amount overlaid under the merchant name */}
      <Box sx={{ position: 'relative', width: 200 }}>
        <AssetImg
          src={BANKS.khqrCard}
          alt="KHQR — NongHyup M.F.I"
          sx={{ width: 200, height: 'auto', display: 'block' }}
          fallback={<Box sx={{ width: 200, aspectRatio: '189 / 259', borderRadius: '12px', bgcolor: '#9C1820' }} />}
        />
        <Box sx={{ position: 'absolute', top: '23.5%', left: '8%', display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography component="span" sx={{ fontSize: 14, fontWeight: 800, color: '#0B0F1A', lineHeight: 1 }}>{amount || '0'}</Typography>
          <Typography component="span" sx={{ fontSize: 9.5, fontWeight: 700, color: '#5B6473', lineHeight: 1 }}>{cur}</Typography>
        </Box>
      </Box>

      {/* Share / Download — generous tap targets (≥44px high) */}
      <Box sx={{ display: 'flex', gap: 1.5, pt: 0.5, width: '100%' }}>
        <QrAction icon="share" label="Share" />
        <QrAction icon="download" label="Download QR" />
      </Box>
    </Box>
  )
}

function QrAction({ icon, label }: { icon: 'share' | 'download'; label: string }) {
  return (
    <Box
      role="button"
      sx={{
        flex: 1,
        minHeight: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        px: 2,
        borderRadius: '12px',
        bgcolor: '#EAF1FC',
        cursor: 'pointer',
        transition: 'background 0.12s',
        '&:hover': { bgcolor: '#DCE9FB' },
        '&:active': { bgcolor: '#CFE0F8' },
      }}
    >
      <Icon name={icon} size={22} color={BLUE} />
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: BLUE }}>{label}</Typography>
    </Box>
  )
}
