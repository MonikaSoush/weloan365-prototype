import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../components/Icon'

const GREEN  = '#76C043'
const NAVY   = '#2B4B8C'
const LABEL  = '#6B7280'
const HEADING = '#0B0F1A'

const ROWS = [
  { label: 'Loan ID',          value: 'NH-2026-04821',      color: HEADING },
  { label: 'Loan Product',     value: 'Small Business Loan', color: HEADING },
  { label: 'Borrower',         value: 'Krong Kampuchea',    color: HEADING },
  { label: 'Status',           value: 'Fully Settled ✓',    color: '#1FA85C' },
  { label: 'Certificate Date', value: '22 Jun 2026',         color: HEADING },
]

export default function SettlementCertificateScreen() {
  const navigate = useNavigate()

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, pt: 1, pb: 0.5 }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back">
          <Icon name="chevronLeft" size={26} color={HEADING} />
        </IconButton>
        <Typography sx={{ fontSize: 17, fontWeight: 700, color: HEADING, flex: 1, textAlign: 'center', mr: 4.5 }}>
          Settlement Certificate
        </Typography>
      </Box>

      {/* Scrollable content */}
      <Box className="scroll-content" sx={{ flex: 1, px: 3, pt: 2, pb: 3 }}>
        {/* Certificate card */}
        <Box sx={{ bgcolor: '#fff', border: `1.5px solid ${NAVY}`, borderRadius: '16px', p: 3 }}>
          {/* Title block */}
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: HEADING, mb: 0.5 }}>
            Settlement Certificate
          </Typography>
          <Typography sx={{ fontSize: 13, color: LABEL, mb: 3 }}>
            NongHyup Finance (Cambodia) Plc
          </Typography>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
                borderBottom: i < ROWS.length - 1 ? '1px solid #F0F2F5' : 'none',
              }}
            >
              <Typography sx={{ fontSize: 13.5, color: LABEL }}>{row.label}</Typography>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: row.color }}>{row.value}</Typography>
            </Box>
          ))}

          {/* Footer */}
          <Box sx={{ mt: 3, pt: 2.5, borderTop: `2px solid ${NAVY}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 800, color: NAVY, textAlign: 'center' }}>
              NongHyup Finance (Cambodia) Plc
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#9AA3B2', textAlign: 'center', lineHeight: 1.5 }}>
              This certificate confirms full settlement of the above loan.
            </Typography>
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
