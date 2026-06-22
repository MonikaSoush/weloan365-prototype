import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../components/Icon'

const HEADING = '#0B0F1A'
const LABEL   = '#737373'
const VALUE   = '#171717'
const GREEN   = '#76C043'
const NAVY    = '#2B4B8C'

type Row = { no: number; date: string; principal: string; interest: string; fees: string; total: string; status: 'paid' | 'pending' }

const ROWS: Row[] = [
  { no:  1, date: '05 Mar 2024', principal: '$38.99', interest: '$5.40', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  2, date: '05 Apr 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  3, date: '05 May 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  4, date: '05 Jun 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  5, date: '05 Jul 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  6, date: '05 Aug 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  7, date: '05 Sep 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  8, date: '05 Oct 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no:  9, date: '05 Nov 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 10, date: '05 Dec 2024', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 11, date: '05 Jan 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 12, date: '05 Feb 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 13, date: '05 Mar 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 14, date: '05 Apr 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 15, date: '05 May 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 16, date: '05 Jun 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 17, date: '05 Jul 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 18, date: '05 Aug 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 19, date: '05 Sep 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 20, date: '05 Oct 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 21, date: '05 Nov 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 22, date: '05 Dec 2025', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 23, date: '05 Jan 2026', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
  { no: 24, date: '08 Feb 2026', principal: '$39.46', interest: '$4.93', fees: '$0.60', total: '$44.99', status: 'paid' },
]

const HEAD = ['#', 'Due Date', 'Principal', 'Interest', 'Total']

export default function RepaymentScheduleDetailScreen() {
  const navigate = useNavigate()

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, pt: 1, pb: 0.5, bgcolor: '#F5F5F5' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back">
          <Icon name="chevronLeft" size={26} color={HEADING} />
        </IconButton>
        <Typography sx={{ fontSize: 17, fontWeight: 700, color: HEADING, flex: 1, textAlign: 'center', mr: 4.5 }}>
          Repayment Schedule
        </Typography>
      </Box>

      <Box className="scroll-content" sx={{ flex: 1, px: 3, pt: 1.5, pb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Loan summary */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: 2, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { label: 'Loan Product',    value: 'Small Business Loan' },
            { label: 'Loan ID',         value: 'NH-2026-04821' },
            { label: 'Loan Amount',     value: '$4,500.00' },
            { label: 'Term',            value: '24 months' },
            { label: 'Interest Rate',   value: '1.20% / month' },
            { label: 'Payment Method',  value: 'Monthly instalment' },
            { label: 'Disbursed On',    value: '05 Mar 2024' },
            { label: 'Closed On',       value: '08 Feb 2026' },
          ].map((r, i, arr) => (
            <Box key={r.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.25, borderBottom: i < arr.length - 1 ? '1px solid #F0F2F5' : 'none' }}>
              <Typography sx={{ fontSize: 13, color: LABEL }}>{r.label}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: VALUE }}>{r.value}</Typography>
            </Box>
          ))}
        </Box>

        {/* Full schedule table */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', overflow: 'hidden' }}>
          {/* Table header */}
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <Box component="thead">
              <Box component="tr" sx={{ bgcolor: NAVY }}>
                {HEAD.map((h, i) => (
                  <Box component="th" key={h} sx={{ fontSize: 11, fontWeight: 700, color: '#fff', textAlign: i === 0 ? 'center' : i === HEAD.length - 1 ? 'right' : 'left', px: i === 0 ? 1 : '8px', py: '10px', width: i === 0 ? 28 : i === 1 ? 80 : undefined }}>
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {ROWS.map((row, ri) => (
                <Box component="tr" key={ri} sx={{ bgcolor: ri % 2 === 0 ? '#fff' : '#FAFBFC', borderBottom: ri < ROWS.length - 1 ? '1px solid #F0F2F5' : 'none' }}>
                  <Box component="td" sx={{ textAlign: 'center', px: 1, py: '9px' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: NAVY, lineHeight: 1.2 }}>{row.no}</Typography>
                    <Typography sx={{ fontSize: 9, color: LABEL, lineHeight: 1.2 }}>/{ROWS.length}</Typography>
                  </Box>
                  <Box component="td" sx={{ px: '8px', py: '9px', fontSize: 11.5, color: VALUE, whiteSpace: 'nowrap' }}>{row.date}</Box>
                  <Box component="td" sx={{ px: '8px', py: '9px', fontSize: 11.5, color: VALUE }}>{row.principal}</Box>
                  <Box component="td" sx={{ px: '8px', py: '9px', fontSize: 11.5, color: VALUE }}>{row.interest}</Box>
                  <Box component="td" sx={{ px: '8px', py: '9px', textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                      <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: VALUE }}>{row.total}</Typography>
                      <Box sx={{ bgcolor: '#EBF6EC', borderRadius: '999px', px: '5px', py: '1px' }}>
                        <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: '#1F6724', lineHeight: 1.4 }}>Paid</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            {/* Totals footer */}
            <Box component="tfoot">
              <Box component="tr" sx={{ bgcolor: '#E7F7EC' }}>
                <Box component="td" colSpan={2} sx={{ px: '8px', py: '10px', fontSize: 12, fontWeight: 800, color: '#1F8A4C' }}>Total</Box>
                <Box component="td" sx={{ px: '8px', py: '10px', fontSize: 12, fontWeight: 700, color: '#1F8A4C' }}>$1,650.00</Box>
                <Box component="td" sx={{ px: '8px', py: '10px', fontSize: 12, fontWeight: 700, color: '#1F8A4C' }}>$142.50</Box>
                <Box component="td" sx={{ px: '8px', py: '10px', fontSize: 12, fontWeight: 800, color: '#1F8A4C', textAlign: 'right' }}>$1,800.00</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Pinned download button */}
      <Box sx={{ flexShrink: 0, px: 3, py: 2.5, bgcolor: '#fff', borderTop: '1px solid #F0F2F5' }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<Icon name="download" size={20} />}
          sx={{ height: 52, borderRadius: '14px', fontSize: 15, fontWeight: 700, bgcolor: GREEN, '&:hover': { bgcolor: '#5EA832' }, boxShadow: 'none' }}
        >
          Download as PDF
        </Button>
      </Box>
    </Box>
  )
}
