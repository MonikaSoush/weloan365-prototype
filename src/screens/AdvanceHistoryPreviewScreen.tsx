import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../components/Icon'

const HEADING = '#0B0F1A'
const BLUE = '#275CB2'
const BRAND = '#2B53A8'
const HEAD_ORANGE = '#C2700C'
const BORDER = '#C9CDD4'

type Row = { date: string; deposit: string; pay: string; transfer?: string }

const ALL_ROWS: Row[] = [
  { date: '5/08/2026', deposit: '$44.99', pay: '$0.00' },
  { date: '5/08/2026', deposit: '$44.99', pay: '$0.00' },
  { date: '5/08/2026', deposit: '$0.00', pay: '$44.99', transfer: 'កម្ចីខ្នាតតូច' },
  { date: '5/08/2026', deposit: '$0.00', pay: '$44.99', transfer: 'កម្ចីគេហដ្ឋាន' },
  { date: '5/08/2026', deposit: '$0.00', pay: '$44.99', transfer: 'កម្ចីពលករ' },
  { date: '4/08/2026', deposit: '$22.50', pay: '$0.00' },
  { date: '4/08/2026', deposit: '$22.50', pay: '$0.00' },
  { date: '4/08/2026', deposit: '$0.00', pay: '$44.99', transfer: 'កម្ចីខ្នាតតូច' },
  { date: '3/08/2026', deposit: '$55.00', pay: '$0.00' },
  { date: '3/08/2026', deposit: '$0.00', pay: '$55.00', transfer: 'កម្ចីពលករ' },
  { date: '2/08/2026', deposit: '$30.00', pay: '$0.00' },
  { date: '2/08/2026', deposit: '$0.00', pay: '$30.00', transfer: 'កម្ចីគេហដ្ឋាន' },
  { date: '1/08/2026', deposit: '$100.00', pay: '$0.00' },
  { date: '1/08/2026', deposit: '$0.00', pay: '$44.99', transfer: 'កម្ចីខ្នាតតូច' },
  { date: '1/08/2026', deposit: '$0.00', pay: '$44.99', transfer: 'កម្ចីពលករ' },
  { date: '31/07/2026', deposit: '$44.99', pay: '$0.00' },
]

const COL_W = [110, 90, 90, 120]
const HEAD = ['កាលបរិច្ឆេទ', 'ដាក់ប្រាក់', 'ប្រាក់បង់កម្ចី', 'ផ្ទេរទៅកាន់កម្ចី']

export default function AdvanceHistoryPreviewScreen() {
  const navigate = useNavigate()

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      {/* Header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, px: 1.5, pt: 3, pb: 1.5, bgcolor: '#fff', borderBottom: '1px solid #EDEFF2' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: HEADING }}>
          <Icon name="chevronLeft" size={26} color={HEADING} />
        </IconButton>
        <Typography noWrap sx={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: HEADING, letterSpacing: '-0.3px' }}>
          Advance History.pdf
        </Typography>
        <Typography role="button" sx={{ flexShrink: 0, fontSize: 16, fontWeight: 700, color: BLUE, px: 1, cursor: 'pointer' }}>
          Save
        </Typography>
      </Box>

      {/* Document body */}
      <Box className="scroll-content" sx={{ flex: 1, overflow: 'auto', bgcolor: '#fff' }}>
        <Box sx={{ minWidth: 430, px: 2.5, py: 3 }}>
          {/* Title block */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography sx={{ fontSize: 17, fontWeight: 700, color: BRAND, fontFamily: 'Georgia, serif' }}>
              NongHyup Finance (Cambodia) Plc.
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: BRAND, fontFamily: 'Georgia, serif' }}>
              Advance Account History
            </Typography>
          </Box>

          {/* Metadata */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 3, rowGap: 1, mb: 2 }}>
            <Meta label="Account No" value="ADV-2026-0418" />
            <Meta label="Date" value="16/06/2026" />
            <Meta label="Client Name" value="Krong Kampuchea" />
            <Meta label="Balance" value="$120.00" />
            <Meta label="Total IN" value="$364.97" />
            <Meta label="Total OUT" value="$354.94" />
          </Box>

          {/* Table */}
          <Box sx={{ border: `1px solid ${BORDER}` }}>
            {/* Head */}
            <Box sx={{ display: 'flex', borderBottom: `1px solid ${BORDER}` }}>
              {HEAD.map((h, i) => (
                <DocCell key={h} w={COL_W[i]} head last={i === HEAD.length - 1}>{h}</DocCell>
              ))}
            </Box>
            {/* Rows */}
            {ALL_ROWS.map((row, ri) => (
              <Box key={ri} sx={{ display: 'flex', borderBottom: ri < ALL_ROWS.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <DocCell w={COL_W[0]}>{row.date}</DocCell>
                <DocCell w={COL_W[1]} color={row.deposit !== '$0.00' ? '#1A9E5C' : undefined} bold={row.deposit !== '$0.00'}>
                  {row.deposit !== '$0.00' ? `+${row.deposit}` : row.deposit}
                </DocCell>
                <DocCell w={COL_W[2]} color={row.pay !== '$0.00' ? '#D63B3B' : undefined} bold={row.pay !== '$0.00'}>
                  {row.pay !== '$0.00' ? `-${row.pay}` : row.pay}
                </DocCell>
                <DocCell w={COL_W[3]} last>
                  {row.transfer ?? '—'}
                </DocCell>
              </Box>
            ))}
          </Box>

          <Typography sx={{ fontSize: 11, color: '#8A94A6', textAlign: 'center', mt: 2 }}>
            Showing {ALL_ROWS.length} of {ALL_ROWS.length} records
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'baseline' }}>
      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: HEADING, whiteSpace: 'nowrap' }}>{label}:</Typography>
      <Typography sx={{ fontSize: 11.5, color: '#333', minWidth: 0 }}>{value}</Typography>
    </Box>
  )
}

function DocCell({ children, w, head, bold, color, last }: { children: React.ReactNode; w: number; head?: boolean; bold?: boolean; color?: string; last?: boolean }) {
  return (
    <Box sx={{ width: w, flexShrink: 0, px: '6px', py: '6px', borderRight: last ? 'none' : `1px solid ${BORDER}`, textAlign: 'center' }}>
      <Typography sx={{ fontSize: 11, fontWeight: head || bold ? 700 : 400, color: color ?? (head ? HEAD_ORANGE : HEADING), lineHeight: 1.3 }}>
        {children}
      </Typography>
    </Box>
  )
}
