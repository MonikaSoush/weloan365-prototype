import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../components/Icon'
import CallSheet from '../components/CallSheet'
import { MwlHeader } from './mwl/MwlParts'

// ─────────────────────────────────────────────────────────────────────────────
// Completed loan detail — opened by tapping a "Paid Off" card on My Loans.
// Fully-settled variant: green 100% donut, repayment breakdown, schedule,
// documents and officer. No payment / service-request actions.
// ─────────────────────────────────────────────────────────────────────────────
const HEADING = '#0B0F1A'
const LABEL = '#737373'
const VALUE = '#171717'
const ACCENT = '#345EAC'
const PAID = '#275CB2'
const GREEN = '#76C043'

export default function CompletedLoanDetailScreen() {
  const navigate = useNavigate()
  const [callOpen, setCallOpen] = useState(false)

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1, pb: '44px' }}>
        <MwlHeader onBack={() => navigate(-1)} />
        <Typography sx={{ fontSize: 28, fontWeight: 800, color: HEADING, letterSpacing: '-1px', px: 3, mt: 1 }}>
          Small Business Loan
        </Typography>

        <Box sx={{ px: 3, pt: 2.5, pb: 6, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Status row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ bgcolor: '#DCF5E6', borderRadius: '999px', px: '9px', py: '3px' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#1FA85C' }}>Completed</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: LABEL, letterSpacing: '0.65px' }}>NH-2026-04821</Typography>
          </Box>

          {/* Overview card — donut + legend + progress + meta */}
          <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Donut />
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <LegendRow color="#D9D9D9" label="Loan Amount" value="$4,500.00" />
                <LegendRow color={GREEN}   label="Total Paid"  value="$1,800.00" />
                <LegendRow color={PAID}    label="Outstanding" value="$0.00" />
              </Box>
            </Box>

            {/* Progress — fully complete */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 500, color: LABEL }}>24 of 24 paid</Typography>
                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: GREEN }}>100% completed</Typography>
              </Box>
              <Box sx={{ height: 6, borderRadius: '999px', bgcolor: '#EDEFF3', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', width: '100%', bgcolor: GREEN, borderRadius: '999px' }} />
              </Box>
            </Box>

            {/* Meta row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F0F0F0', pt: 1.5 }}>
              <MetaCol label="Closed On"   value="08 Feb 2026" />
              <MetaCol label="Term"        value="24 months" />
              <MetaCol label="Rate"        value="1.20%/mo" />
            </Box>
          </Box>

          {/* Repayment breakdown */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <SectionLabel>Repayment Breakdown</SectionLabel>
            <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', overflow: 'hidden' }}>
              <BreakdownRow label="Principal repaid" value="$1,650.00" divider />
              <BreakdownRow label="Interest paid" value="$142.50" divider />
              <BreakdownRow label="Fees" value="$7.50" divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#E7F7EC', px: 2, py: '14px' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1F8A4C' }}>Total paid</Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#1F8A4C' }}>$1,800.00</Typography>
              </Box>
              <Box
                onClick={() => navigate('/settlement-certificate')}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: '14px', borderTop: '1px solid #F0F0F0', cursor: 'pointer', '&:active': { opacity: 0.7 } }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon name="download" size={16} color={GREEN} />
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: GREEN }}>Download Certificate</Typography>
                </Box>
                <Icon name="chevronRight" size={16} color={GREEN} />
              </Box>
            </Box>
          </Box>

          {/* Repayment schedule */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <SectionLabel>History Repayment Schedule</SectionLabel>
            <PaymentTable />
            <Typography sx={{ fontSize: 11, color: LABEL, textAlign: 'center', mt: 0.5 }}>
              Showing 3 of 6 · <Box component="span" onClick={() => navigate('/repayment-schedule-detail')} sx={{ color: ACCENT, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Download</Box> for full view
            </Typography>
          </Box>

          {/* My documents */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <SectionLabel>My Documents</SectionLabel>
            <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', px: '14px' }}>
              {COMPLETED_DOCS.map((d, i) => (
                <CompletedDocRow key={d.title} {...d} last={i === COMPLETED_DOCS.length - 1} onNavigate={() => navigate(`/document-view?name=${encodeURIComponent(d.title)}`)} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25, pl: 0.5 }}>
              <Icon name="accountSecurity" size={14} color="#9AA3B2" />
              <Typography sx={{ fontSize: 11.5, color: '#9AA3B2' }}>Official NH documents. Downloads are watermarked with retrieval date.</Typography>
            </Box>
          </Box>

          {/* My officer */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <SectionLabel>My Officer</SectionLabel>
            <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: 'radial-gradient(circle at 30% 30%, #9BD0FF 0%, #4C8BE0 45%, #2B4F92 100%)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: VALUE }}>Mr. Pisey Sok</Typography>
                <Typography sx={{ fontSize: 11, color: LABEL }}>Riverside Branch</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box
                  role="button"
                  aria-label="Chat with officer"
                  onClick={() => navigate('/chat')}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', transition: 'background-color 0.15s ease', '&:active': { bgcolor: 'rgba(0,0,0,0.06)' } }}
                >
                  <Icon name="message" size={22} color="#0B0F1A" />
                </Box>
                <Box
                  role="button"
                  onClick={() => setCallOpen(true)}
                  aria-label="Call officer"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', transition: 'background-color 0.15s ease', '&:active': { bgcolor: 'rgba(0,0,0,0.06)' } }}
                >
                  <Icon name="phone" size={22} color="#0B0F1A" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>


      <CallSheet open={callOpen} onClose={() => setCallOpen(false)} />
    </Box>
  )
}

function Donut() {
  // Fully settled — entire ring is green, $0.00 outstanding.
  const r = 38
  return (
    <Box sx={{ position: 'relative', width: 92, height: 92, flexShrink: 0 }}>
      <Box component="svg" viewBox="0 0 92 92" sx={{ width: 92, height: 92, transform: 'rotate(-90deg)' }}>
        <circle cx={46} cy={46} r={r} fill="none" stroke="#EDEDED" strokeWidth={9} />
        <circle cx={46} cy={46} r={r} fill="none" stroke={GREEN} strokeWidth={9} />
      </Box>
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: VALUE, lineHeight: 1.1 }}>$0.00</Typography>
        <Typography sx={{ fontSize: 11, fontWeight: 500, color: LABEL, lineHeight: 1.1 }}>outstanding</Typography>
      </Box>
    </Box>
  )
}

function LegendRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: color }} />
        <Typography sx={{ fontSize: 14, color: LABEL }}>{label}</Typography>
      </Box>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#000' }}>{value}</Typography>
    </Box>
  )
}

function MetaCol({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <Typography sx={{ fontSize: 12, color: LABEL }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: VALUE }}>{value}</Typography>
    </Box>
  )
}

function BreakdownRow({ label, value, divider }: { label: string; value: string; divider?: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: '14px', borderBottom: divider ? '1px solid #F0F0F0' : 'none' }}>
      <Typography sx={{ fontSize: 14, color: VALUE }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: VALUE }}>{value}</Typography>
    </Box>
  )
}

// ─── Repayment schedule table ────────────────────────────────────────────────
type PayRow = { no: string; date: string; principal: string; other: string; total: string }
const PAY_ROWS: PayRow[] = [
  { no: '1', date: '5/05/26', principal: '$38.99', other: '$6.00', total: '$44.99' },
  { no: '2', date: '5/05/26', principal: '$39.46', other: '$5.53', total: '$44.99' },
  { no: '3', date: '5/05/26', principal: '$39.46', other: '$5.53', total: '$44.99' },
  { no: '4', date: '5/05/26', principal: '$39.46', other: '$5.53', total: '$44.99' },
]
const PAY_HEAD = ['រ.ល', 'កាលបរិច្ឆេទ', 'ប្រាក់ដើម', 'ផ្សេងៗ', 'ប្រាក់សរុប']
// Fixed column widths so the wide "Total" column (value + paid badge) has room;
// the remaining width flows to the Total column (last, left undefined).
const COL_WIDTH: (number | undefined)[] = [28, 56, 52, 44, undefined]

function PaymentTable() {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', overflow: 'hidden' }}>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <Box component="thead">
          <Box component="tr" sx={{ bgcolor: '#FAFAFA' }}>
            {PAY_HEAD.map((h, i) => (
              <Box
                component="th"
                key={h}
                sx={{
                  fontFamily: `'Noto Sans Khmer', sans-serif`,
                  fontSize: 10,
                  fontWeight: 600,
                  color: LABEL,
                  textAlign: i === 0 ? 'center' : 'left',
                  px: i === 0 ? 0.5 : '6px',
                  py: '12px',
                  borderBottom: '1px solid #F0F0F0',
                  width: COL_WIDTH[i],
                }}
              >
                {h}
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {PAY_ROWS.map((row, ri) => (
            <Box component="tr" key={ri} sx={{ borderBottom: ri < PAY_ROWS.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <Box component="td" sx={{ textAlign: 'center', px: 0.5, py: '8px', fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.25)' }}>
                {row.no}
              </Box>
              <Box component="td" sx={{ px: '6px', py: '8px', fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.25)', whiteSpace: 'nowrap' }}>
                {row.date}
              </Box>
              <Box component="td" sx={{ px: '6px', py: '8px', fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.25)', whiteSpace: 'nowrap' }}>
                {row.principal}
              </Box>
              <Box component="td" sx={{ px: '6px', py: '8px', fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.25)', whiteSpace: 'nowrap' }}>
                {row.other}
              </Box>
              <Box component="td" sx={{ px: '6px', py: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0.75 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.25)', whiteSpace: 'nowrap' }}>{row.total}</Typography>
                  <StatusBadge text="បង់រួច" />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

function StatusBadge({ text }: { text: string }) {
  return (
    <Box sx={{ bgcolor: '#EBF6EC', borderRadius: '999px', px: '4px', py: '2px', flexShrink: 0 }}>
      <Typography sx={{ fontFamily: `'Noto Sans Khmer', sans-serif`, fontSize: 10, fontWeight: 600, color: '#1F6724', lineHeight: 1.2 }}>
        {text}
      </Typography>
    </Box>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ fontSize: 13, fontWeight: 600, color: LABEL, letterSpacing: '0.65px', textTransform: 'uppercase', pl: 0.5 }}>
      {children}
    </Typography>
  )
}

const COMPLETED_DOCS = [
  { title: 'Payment Schedule',   sub: 'Original 24-installment schedule',       size: 'PDF · 48 KB' },
  { title: 'Loan Contract',      sub: 'Signed Small Business Loan agreement',   size: 'PDF · 124 KB' },
  { title: 'Guarantee Contract', sub: 'Guarantor agreement · Third party security', size: 'PDF · 76 KB' },
  { title: 'Disbursement Receipt', sub: 'Proof of loan disbursement',           size: 'PDF · 32 KB' },
]

function CompletedDocRow({ title, sub, size, last, onNavigate }: { title: string; sub: string; size: string; last?: boolean; onNavigate: () => void }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: '14px', borderBottom: last ? 'none' : '1px solid #F0F0F0' }}>
      {/* Document thumbnail */}
      <Box sx={{ width: 40, height: 50, borderRadius: '6px', border: '1px solid #E2E6EC', bgcolor: '#fff', flexShrink: 0, p: '7px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: '3px' }}>
            <Box sx={{ flex: 1, height: 3, bgcolor: '#E2E6EC', borderRadius: '1px' }} />
            <Box sx={{ width: 8, height: 3, bgcolor: '#EDEFF2', borderRadius: '1px' }} />
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: VALUE }} noWrap>{title}</Typography>
        <Typography sx={{ fontSize: 12, color: LABEL, lineHeight: 1.4 }}>{sub}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, flexShrink: 0 }}>
        <Typography sx={{ fontSize: 11, color: LABEL }}>{size}</Typography>
        <Box role="button" onClick={onNavigate} sx={{ display: 'flex', alignItems: 'center', gap: 0.4, bgcolor: '#EEF3FC', borderRadius: '999px', px: 1, py: 0.4, cursor: 'pointer', '&:active': { opacity: 0.7 } }}>
          <Box component="svg" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 13, height: 13 }}>
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>View</Typography>
        </Box>
      </Box>
    </Box>
  )
}
