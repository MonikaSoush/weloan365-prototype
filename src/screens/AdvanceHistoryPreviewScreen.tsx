import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../components/Icon'

const BLUE = '#275CB2'
const HEADING = '#0B0F1A'
const BORDER = '#D8DCE4'
const MUTED = '#8A94A6'
const GREEN = '#1A9E5C'
const RED = '#D63B3B'

type StatRow = {
  date: string; desc: string; ref: string; loan: string; sign: '+' | '-'
  amount: string; balance: string; beginning: string
  fromAccount: string; toAccount: string; currency: string
}

const ROWS: StatRow[] = [
  { date: '18 Jun 2026', desc: 'Top Up',    ref: 'ADV0005', loan: '—',                     sign: '+', amount: '$250.00',    balance: '$350.00',    beginning: '$100.00',    fromAccount: '—',               toAccount: '026-00052501',       currency: 'US Dollar (USD)'       },
  { date: '20 May 2026', desc: 'Settlement', ref: 'ADV0004', loan: 'Micro Loan #LN-2491',   sign: '-', amount: '៛1,107,000', balance: '៛1,393,000', beginning: '៛2,500,000', fromAccount: 'Advance Account',  toAccount: 'Micro Loan #LN-2491', currency: 'Cambodian Riel (KHR)'  },
  { date: '15 May 2026', desc: 'Top Up',    ref: 'ADV0003', loan: '—',                     sign: '+', amount: '៛2,500,000', balance: '៛2,500,000', beginning: '—',          fromAccount: '—',               toAccount: '026-00052501',       currency: 'Cambodian Riel (KHR)'  },
  { date: '20 Apr 2026', desc: 'Settlement', ref: 'ADV0002', loan: 'Housing Loan #LN-1834', sign: '-', amount: '$350.00',    balance: '$100.00',    beginning: '$450.00',    fromAccount: 'Advance Account',  toAccount: 'Housing Loan #LN-1834', currency: 'US Dollar (USD)'    },
  { date: '05 Apr 2026', desc: 'Top Up',    ref: 'ADV0001', loan: '—',                     sign: '+', amount: '$450.00',    balance: '$450.00',    beginning: '—',          fromAccount: '—',               toAccount: '026-00052501',       currency: 'US Dollar (USD)'       },
]

export default function AdvanceHistoryPreviewScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const refParam = params.get('ref')
  const displayRows = refParam ? ROWS.filter(r => r.ref === refParam) : ROWS
  const isSingle = displayRows.length === 1

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#EDEFF2' }}>
      {/* App header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, pt: 3, pb: 1.5, bgcolor: '#EDEFF2' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: HEADING }}>
          <Icon name="chevronLeft" size={26} color={HEADING} />
        </IconButton>
        <Typography noWrap sx={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 800, color: HEADING }}>
          {isSingle ? 'Record.pdf' : 'Statement.pdf'}
        </Typography>
        <Typography role="button" sx={{ fontSize: 15, fontWeight: 700, color: BLUE, px: 1, cursor: 'pointer' }}>
          Save
        </Typography>
      </Box>

      {/* PDF document */}
      <Box className="scroll-content" sx={{ flex: 1, overflow: 'auto', px: 2.5, py: 2, pb: 4 }}>
        <Box sx={{ bgcolor: '#fff', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', overflow: 'hidden' }}>

          {/* PDF Header bar */}
          <Box sx={{ bgcolor: BLUE, px: 3, pt: 2.5, pb: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.3px', lineHeight: 1 }}>NH LOANS</Typography>
              <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', mt: 0.5, lineHeight: 1.3 }}>NongHyup Finance (Cambodia) Plc.</Typography>
            </Box>
            <Box sx={{ width: 42, height: 42, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Typography sx={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>NH</Typography>
            </Box>
          </Box>

          <Box sx={{ px: 3, pt: 2.5, pb: 3 }}>
            {/* Document title */}
            <Typography sx={{ fontSize: 17, fontWeight: 800, color: HEADING, letterSpacing: '-0.3px' }}>
              {isSingle ? `${displayRows[0].desc} — Record` : 'Advance Account — Statement'}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: MUTED, mt: 0.4 }}>
              Generated 19/06/2026, 13:18:44 · {isSingle ? displayRows[0].ref : `${ROWS.length} movements`}
            </Typography>

            {/* Metadata */}
            <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
              <MetaItem label="Account No" value="ADV-2026-0418" />
              <MetaItem label="Client" value="Krong Kampuchea" />
              <MetaItem label="Period" value="Apr – Jun 2026" />
            </Box>

            {/* Summary box — only for full statement */}
            {!isSingle && <Box sx={{ mt: 2.5, border: `1px solid ${BORDER}`, borderRadius: '8px', overflow: 'hidden' }}>
              <Box sx={{ bgcolor: '#F5F7FA', px: 2, py: '8px', borderBottom: `1px solid ${BORDER}` }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', color: MUTED }}>SUMMARY</Typography>
              </Box>
              <SummaryRow label="Total topped up" usd="+$700.00" khr="+៛2,500,000" color={GREEN} />
              <Box sx={{ height: '1px', bgcolor: '#F0F2F5' }} />
              <SummaryRow label="Total deducted" usd="-$350.00" khr="-៛1,107,000" color={RED} />
              <Box sx={{ height: '1px', bgcolor: '#F0F2F5' }} />
              <SummaryRow label="Current balance" usd="$350.00" khr="៛1,393,000" color={HEADING} bold />
            </Box>}

            {/* Detail: vertical record (single) or table (full statement) */}
            {isSingle ? (
              <SingleRecord r={displayRows[0]} />
            ) : (
              <Box sx={{ mt: 2.5, border: `1px solid ${BORDER}`, borderRadius: '8px', overflow: 'hidden' }}>
                <Box sx={{ bgcolor: '#F5F7FA', display: 'grid', gridTemplateColumns: '90px 1fr 80px 75px', borderBottom: `1px solid ${BORDER}` }}>
                  <TH>Date</TH>
                  <TH>Description</TH>
                  <TH align="right">Amount</TH>
                  <TH align="right">Balance</TH>
                </Box>
                {displayRows.map((r, i) => (
                  <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '90px 1fr 80px 75px', borderBottom: i < displayRows.length - 1 ? `1px solid #F0F2F5` : 'none', bgcolor: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                    <Box sx={{ px: '10px', py: '9px' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: HEADING }}>{r.date}</Typography>
                      <Typography sx={{ fontSize: 9.5, color: MUTED, mt: 0.25 }}>{r.ref}</Typography>
                    </Box>
                    <Box sx={{ px: '8px', py: '9px', borderLeft: `1px solid #F0F2F5`, borderRight: `1px solid #F0F2F5` }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: HEADING }}>{r.desc}</Typography>
                      {r.loan !== '—' && (
                        <Typography sx={{ fontSize: 9.5, color: MUTED, mt: 0.25 }} noWrap>{r.loan}</Typography>
                      )}
                    </Box>
                    <Box sx={{ px: '8px', py: '9px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderRight: `1px solid #F0F2F5` }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 800, color: r.sign === '+' ? GREEN : RED, textAlign: 'right' }}>
                        {r.sign === '+' ? '+' : '−'}{r.amount}
                      </Typography>
                    </Box>
                    <Box sx={{ px: '8px', py: '9px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: HEADING, textAlign: 'right' }}>{r.balance}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {/* Footer disclaimer */}
            <Typography sx={{ fontSize: 9.5, color: '#A8B0BC', textAlign: 'center', mt: 2.5, lineHeight: 1.6 }}>
              This statement is generated automatically by NongHyup Finance (Cambodia) Plc. and is valid without a signature. For inquiries, contact your nearest branch or call our hotline.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.4px', color: MUTED }}>{label.toUpperCase()}</Typography>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: HEADING, mt: 0.2 }}>{value}</Typography>
    </Box>
  )
}

function SummaryRow({ label, usd, khr, color, bold }: { label: string; usd: string; khr: string; color: string; bold?: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: '9px', gap: 1 }}>
      <Typography sx={{ fontSize: 12, fontWeight: bold ? 800 : 600, color: bold ? HEADING : MUTED }}>{label}</Typography>
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexShrink: 0 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 800, color }}>{usd}</Typography>
        <Typography sx={{ fontSize: 10, color: MUTED }}>·</Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 800, color }}>{khr}</Typography>
      </Box>
    </Box>
  )
}

function TH({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <Box sx={{ px: '10px', py: '7px', textAlign: align }}>
      <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.4px', color: MUTED }}>{children}</Typography>
    </Box>
  )
}

function SingleRecord({ r }: { r: StatRow }) {
  const isTopUp = r.sign === '+'
  const amtColor = isTopUp ? GREEN : RED
  const rows: [string, string, string?][] = [
    ['Transaction type', `${r.desc} (${isTopUp ? 'Credit' : 'Debit'})`],
    ['Description',      isTopUp ? 'Advance top up' : 'Loan settlement'],
    ['Date',             r.date],
    ['Reference',        r.ref],
    ['From account',     r.fromAccount],
    ['To account',       r.toAccount],
    ['Currency',         r.currency],
    ['Beginning balance',r.beginning],
    [isTopUp ? 'Amount added' : 'Amount deducted', (isTopUp ? '+' : '−') + r.amount, isTopUp ? GREEN : RED],
    ['Ending balance',   r.balance, BLUE],
  ]
  return (
    <Box sx={{ mt: 2.5, border: `1px solid ${BORDER}`, borderRadius: '8px', overflow: 'hidden' }}>
      {rows.map(([label, value, color], i) => {
        const isLast = i === rows.length - 1
        const isAmt = i === rows.length - 2
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, px: '14px', py: '11px', borderBottom: isLast ? 'none' : `1px solid #F0F2F5` }}>
            <Typography sx={{ fontSize: 13, color: MUTED, flexShrink: 0 }}>{label}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: isLast || isAmt ? 800 : 600, color: color ?? HEADING, textAlign: 'right' }}>
              {value}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}
