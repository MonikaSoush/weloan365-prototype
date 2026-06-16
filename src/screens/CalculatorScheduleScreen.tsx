import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../components/Icon'

const BLUE = '#275CB2'
const HEADING = '#0B0F1A'
const MUTED = '#8A94A6'
const LABEL = '#6B7280'

type Currency = 'USD' | 'KHR'
type ScheduleRow = { month: number; principal: number; interest: number; payment: number; balance: number }

function money(v: number, cur: Currency) {
  if (cur === 'KHR') return '៛' + Math.round(v * 4100).toLocaleString('en-US')
  return '$' + v.toFixed(2)
}

export default function CalculatorScheduleScreen() {
  const navigate = useNavigate()
  const { state } = useLocation() as {
    state: {
      rows: ScheduleRow[]
      totals: { principal: number; interest: number; payable: number }
      currency: Currency
      term: number
    } | null
  }

  const rows: ScheduleRow[] = state?.rows ?? []
  const totals = state?.totals ?? { principal: 0, interest: 0, payable: 0 }
  const currency: Currency = state?.currency ?? 'USD'
  const term: number = state?.term ?? 0

  const handleSave = () => {
    const headers = ['Month', 'Principal', 'Interest', 'Payment', 'Balance']
    const csvRows = rows.map((r) =>
      [r.month, r.principal.toFixed(2), r.interest.toFixed(2), r.payment.toFixed(2), r.balance.toFixed(2)].join(',')
    )
    const csv = [headers.join(','), ...csvRows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'repayment-schedule.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      {/* Header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, px: 1.5, pt: 3, pb: 1.5, bgcolor: '#fff', borderBottom: '1px solid #EDEFF2' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: HEADING }}>
          <Icon name="chevronLeft" size={26} color={HEADING} />
        </IconButton>
        <Typography noWrap sx={{ flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 800, color: HEADING, letterSpacing: '-0.3px' }}>
          Repayment Schedule
        </Typography>
        <Typography role="button" onClick={handleSave} sx={{ flexShrink: 0, fontSize: 16, fontWeight: 700, color: BLUE, px: 1, cursor: 'pointer' }}>
          Save
        </Typography>
      </Box>

      {/* Table */}
      <Box className="scroll-content" sx={{ flex: 1, px: 3, pb: 4, bgcolor: '#fff' }}>
        {/* Column headers */}
        <Box sx={{ bgcolor: '#E9EDF2', borderRadius: '10px 10px 0 0', display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr 1fr', px: 1.5, py: 1 }}>
          {['#', 'Principal', 'Interest', 'Payment', 'Balance'].map((h) => (
            <Typography key={h} sx={{ fontSize: 11, fontWeight: 700, color: LABEL, textAlign: h === '#' ? 'left' : 'right', letterSpacing: '0.3px' }}>{h}</Typography>
          ))}
        </Box>

        {/* Rows */}
        <Box sx={{ bgcolor: '#fff', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <Box
              key={r.month}
              sx={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 1fr 1fr 1fr',
                px: 1.5,
                py: 1.25,
                bgcolor: i % 2 === 0 ? '#fff' : '#FAFAFA',
                borderBottom: i < rows.length - 1 ? '1px solid #F0F2F5' : 'none',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: MUTED }}>{r.month}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: HEADING, textAlign: 'right' }}>{money(r.principal, currency)}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: HEADING, textAlign: 'right' }}>{money(r.interest, currency)}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: BLUE, textAlign: 'right' }}>{money(r.payment, currency)}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: HEADING, textAlign: 'right' }}>{money(r.balance, currency)}</Typography>
            </Box>
          ))}

          {/* Totals row */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr 1fr', px: 1.5, py: 1.25, bgcolor: '#F4F8FF', borderTop: '2px solid #D6E2F5' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: LABEL }}>Σ</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: HEADING, textAlign: 'right' }}>{money(totals.principal, currency)}</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: HEADING, textAlign: 'right' }}>{money(totals.interest, currency)}</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: BLUE, textAlign: 'right' }}>{money(totals.payable, currency)}</Typography>
            <Typography sx={{ fontSize: 12, color: MUTED, textAlign: 'right' }}>—</Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}
