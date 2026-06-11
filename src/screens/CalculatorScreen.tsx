import { ReactNode, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import { Icon } from '../components/Icon'
import { FieldCard, BLUE } from './mwl/MwlParts'

// ─────────────────────────────────────────────────────────────────────────────
// Loan calculator — equal-monthly-payment (annuity) amortization.
// Term slider recomputes the monthly payment, totals and repayment preview live.
// ─────────────────────────────────────────────────────────────────────────────
const MUTED = '#747A81'
const LABEL = '#737373'

const usd = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

type ScheduleRow = { month: number; principal: number; interest: number; payment: number; balance: number }

function amortize(amount: number, months: number, monthlyRatePct: number) {
  const r = monthlyRatePct / 100
  const payment = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months))
  const rows: ScheduleRow[] = [{ month: 0, principal: 0, interest: 0, payment: 0, balance: amount }]
  let balance = amount
  for (let m = 1; m <= months; m++) {
    const interest = balance * r
    const principal = payment - interest
    balance = Math.max(0, balance - principal)
    rows.push({ month: m, principal, interest, payment, balance })
  }
  const totalPayable = payment * months
  return { payment, totalPayable, totalInterest: totalPayable - amount, rows }
}

export default function CalculatorScreen() {
  const navigate = useNavigate()
  const [amount] = useState(1000)
  const [term, setTerm] = useState(12)
  const monthlyInterest = 1.04

  const { payment, totalPayable, totalInterest, rows } = useMemo(
    () => amortize(amount, term, monthlyInterest),
    [amount, term],
  )
  const totalPrincipalPaid = rows.slice(1).reduce((s, r) => s + r.principal, 0)

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        {/* Header */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: '#F5F5F5', px: 3, pt: 3, pb: 1 }}>
          <IconButton onClick={() => navigate('/home?v=1')} aria-label="Back" sx={{ ml: -1, color: '#0B0F1A' }}>
            <Icon name="chevronLeft" size={26} color="#0B0F1A" />
          </IconButton>
        </Box>
        <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#000', letterSpacing: '-1px', px: 3, mt: 0.5, mb: 2 }}>
          Loan calculator
        </Typography>

        <Box sx={{ px: 3, pb: '34px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* ─── Inputs ───────────────────────────────────────────────────── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FieldCard
              label="Loan product"
              value="Migrant Worker Loan"
              onClick={() => {}}
              trailing={<Icon name="chevronDown" size={18} color={MUTED} />}
            />

            {/* Amount */}
            <Box sx={{ bgcolor: '#fff', borderRadius: '14px', px: '16px', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: 12, color: MUTED, lineHeight: '16px' }}>Amount $100 ~ $300,000</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: MUTED }}>$</Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#000' }}>{amount.toLocaleString('en-US')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: MUTED }}>USD</Typography>
                  <Icon name="chevronsUpDown" size={18} color={MUTED} />
                </Box>
              </Box>
            </Box>

            {/* Payment estimate (term slider) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <SectionLabel>Payment estimate</SectionLabel>
              <Box sx={{ bgcolor: '#fff', borderRadius: '12px', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#525252' }}>12 months</Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#525252' }}>240 months</Typography>
                </Box>
                <Slider
                  value={term}
                  onChange={(_, v) => setTerm(v as number)}
                  min={12}
                  max={240}
                  step={1}
                  aria-label="Loan term in months"
                  sx={{
                    py: 1,
                    color: BLUE,
                    height: 4,
                    '& .MuiSlider-rail': { bgcolor: 'rgba(12,65,154,0.12)', opacity: 1 },
                    '& .MuiSlider-track': { border: 'none' },
                    '& .MuiSlider-thumb': {
                      width: 14,
                      height: 14,
                      bgcolor: '#fff',
                      border: `2px solid ${BLUE}`,
                      boxShadow: '0 1px 3px rgba(12,65,154,0.3)',
                      '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 6px rgba(0,82,204,0.16)' },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Loan term + Monthly interest */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ width: 171, flexShrink: 0, bgcolor: '#fff', borderRadius: '14px', px: '16px', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5 }}>
                <Typography sx={{ fontSize: 12, color: MUTED, lineHeight: '16px' }}>Loan term</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#000' }}>{term}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: MUTED }}>Month</Typography>
                    <Icon name="chevronsUpDown" size={18} color={MUTED} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, bgcolor: '#E5E5E5', borderRadius: '14px', px: '16px', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5 }}>
                <Typography sx={{ fontSize: 12, color: MUTED, lineHeight: '16px' }}>Monthly interest</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#000' }}>{monthlyInterest.toFixed(2)}</Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: MUTED }}>%</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ─── Results ──────────────────────────────────────────────────── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FieldCard
              label="Repayment method"
              value="Equal monthly payment"
              onClick={() => {}}
              trailing={<Icon name="chevronDown" size={18} color={MUTED} />}
            />

            {/* Monthly payment summary */}
            <Box sx={{ bgcolor: '#fff', borderRadius: '16px', p: 2 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.6px', color: LABEL, textTransform: 'uppercase' }}>
                Monthly payment
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.75, mt: 0.5 }}>
                <Typography sx={{ fontSize: 32, fontWeight: 800, color: '#000', letterSpacing: '-0.5px', lineHeight: 1 }}>
                  {usd(payment)}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#000', mb: '2px' }}>/ month</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 1.5, pt: 1.5, borderTop: '1px solid rgba(0,0,0,0.18)' }}>
                <SummaryStat label="Total interest" value={usd(totalInterest)} />
                <SummaryStat label="Total payable" value={usd(totalPayable)} />
              </Box>
            </Box>

            {/* Repayment preview */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <SectionLabel>Repayment preview</SectionLabel>
              <Box sx={{ bgcolor: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
                <RepaymentTable
                  rows={rows}
                  totals={{ principal: totalPrincipalPaid, interest: totalInterest, payable: totalPayable }}
                />
              </Box>
              <Typography sx={{ fontSize: 14, color: LABEL, textAlign: 'center', py: 1.5 }}>
                Showing 3 of {term} · <Box component="span" sx={{ color: BLUE, fontWeight: 700 }}>Download</Box> for full view
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ flexShrink: 0, px: 3, pb: '44px', pt: 1, bgcolor: '#F5F5F5' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/mwl-about')}
          sx={{ minHeight: 48, borderRadius: '8px', fontSize: 16, fontWeight: 600, bgcolor: '#275CB2', '&:hover': { bgcolor: '#1f4f9e' } }}
        >
          Apply this loan
        </Button>
      </Box>
    </Box>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.65px', color: LABEL, textTransform: 'uppercase' }}>
      {children}
    </Typography>
  )
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.5px', color: LABEL, textTransform: 'uppercase' }}>{label}</Typography>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#000', mt: 0.5 }}>{value}</Typography>
    </Box>
  )
}

// ─── Repayment preview table (Khmer headers, first 3 months + total row) ─────
const HEAD = ['ចំនួនខែ', 'ប្រាក់ដើម', 'ការប្រាក់', 'ប្រាក់សរុបត្រូវបង់', 'សមតុល្យប្រាក់ដើម']

function RepaymentTable({
  rows,
  totals,
}: {
  rows: ScheduleRow[]
  totals: { principal: number; interest: number; payable: number }
}) {
  const preview = rows.slice(0, 3) // months 0, 1, 2
  return (
    <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <Box component="thead">
        <Box component="tr">
          <Th sx={{ width: 52 }}>{HEAD[0]}</Th>
          <Th>{HEAD[1]}</Th>
          <Th>{HEAD[2]}</Th>
          <Th>{HEAD[3]}</Th>
          <Th>{HEAD[4]}</Th>
        </Box>
      </Box>
      <Box component="tbody">
        {preview.map((r) => (
          <Box component="tr" key={r.month} sx={{ borderTop: '1px solid #F0F0F0' }}>
            <Td bold>{r.month}</Td>
            <Td>{usd(r.principal)}</Td>
            <Td>{usd(r.interest)}</Td>
            <Td strong>{usd(r.payment)}</Td>
            <Td>{usd(r.balance)}</Td>
          </Box>
        ))}
        {/* Total row */}
        <Box component="tr" sx={{ borderTop: '1px solid #F0F0F0' }}>
          <Td accent bold>សរុប</Td>
          <Td accent>{usd(totals.principal)}</Td>
          <Td accent>{usd(totals.interest)}</Td>
          <Td accent>{usd(totals.payable)}</Td>
          <Td> </Td>
        </Box>
      </Box>
    </Box>
  )
}

function Th({ children, sx }: { children: ReactNode; sx?: object }) {
  return (
    <Box
      component="th"
      sx={{ bgcolor: '#FAFAFA', borderBottom: '1px solid #F0F0F0', fontSize: 11, fontWeight: 600, color: '#737373', textAlign: 'center', px: 0.5, py: 1, lineHeight: 1.2, verticalAlign: 'middle', ...sx }}
    >
      {children}
    </Box>
  )
}

function Td({ children, strong = false, accent = false, bold = false }: { children: ReactNode; strong?: boolean; accent?: boolean; bold?: boolean }) {
  return (
    <Box
      component="td"
      sx={{
        fontSize: 12,
        textAlign: 'center',
        px: 0.5,
        py: 1,
        height: 46,
        color: accent ? BLUE : strong ? '#000' : '#737373',
        fontWeight: bold || strong || accent ? 600 : 500,
      }}
    >
      {children}
    </Box>
  )
}
