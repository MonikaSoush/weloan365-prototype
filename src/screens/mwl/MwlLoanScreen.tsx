import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import { Icon } from '../../components/Icon'
import { MwlHeader, MwlTitle, MwlFooter, GroupLabel, BLUE } from './MwlParts'

const TABLE_HEAD = ['ចំនួនខែ', 'ប្រាក់ដើម', 'ការប្រាក់', 'ប្រាក់សរុបត្រូវបង់', 'សមតុល្យប្រាក់ដើម']
const TABLE_ROWS = [
  ['0', '$0.00', '$0.00', '$0.00', '$1,000.00'],
  ['1', '$78.67', '$10.40', '$89.07', '$921.33'],
  ['2', '$79.49', '$9.58', '$89.07', '$841.83'],
]
const TABLE_TOTAL = ['សរុប', '$1,000.00', '$68.88', '$1,068.88', '']

export default function MwlLoanScreen({ nonMwl = false }: { nonMwl?: boolean } = {}) {
  const navigate = useNavigate()
  const prefix = nonMwl ? '/nonmwl' : '/mwl'
  const [showTable, setShowTable] = useState(true)
  const [months, setMonths] = useState(12)

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <MwlHeader onBack={() => navigate(`${prefix}-about`)} step={2} totalSteps={nonMwl ? 2 : 3} />
        <MwlTitle>Loan request</MwlTitle>

        <Box sx={{ px: 3, pb: 3, pt: 1.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Amount */}
          <Box>
            <GroupLabel>REQUEST AMOUNT $100 – $15,000</GroupLabel>
            <Box sx={{ bgcolor: '#fff', borderRadius: '12px', px: 2, py: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Amount</Typography>
                <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#0B0F1A' }}>$ 5,000.00</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0B0F1A' }}>USD</Typography>
                <Icon name="chevronsUpDown" size={16} color="#8A94A6" />
              </Box>
            </Box>
            <Box
              onClick={() => setShowTable((v) => !v)}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.75, mt: 1.25, cursor: 'pointer' }}
            >
              <Icon name={showTable ? 'eyeOff' : 'eye'} size={17} color={BLUE} />
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: BLUE }}>
                {showTable ? 'Hide' : 'Show'} Payment Table
              </Typography>
            </Box>
          </Box>

          {showTable && (
          <>
          {/* Payment estimate */}
          <Box>
            <GroupLabel>PAYMENT ESTIMATE</GroupLabel>
            <Box sx={{ bgcolor: '#fff', borderRadius: '12px', px: 2, py: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>{months} months</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>240 months</Typography>
              </Box>
              <Slider
                value={months}
                min={12}
                max={240}
                onChange={(_, v) => setMonths(v as number)}
                sx={{ color: BLUE, mt: 0.5, '& .MuiSlider-thumb': { width: 20, height: 20, bgcolor: '#fff', border: `4px solid ${BLUE}` }, '& .MuiSlider-rail': { bgcolor: '#E2E6EC', opacity: 1 } }}
              />
            </Box>
          </Box>

          {/* Loan term + interest */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: '12px', px: 2, py: 1.25 }}>
              <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Loan term</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.25 }}>
                <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#0B0F1A' }}>12</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <Typography sx={{ fontSize: 13, color: '#8A94A6' }}>Month</Typography>
                  <Icon name="chevronsUpDown" size={14} color="#8A94A6" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ bgcolor: '#E7EAEF', borderRadius: '12px', px: 2, py: 1.25 }}>
              <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Monthly interest</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.25 }}>
                <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#0B0F1A' }}>1.04</Typography>
                <Typography sx={{ fontSize: 13, color: '#8A94A6' }}>%</Typography>
              </Box>
            </Box>
          </Box>

          {/* Repayment method */}
          <Box sx={{ bgcolor: '#fff', borderRadius: '12px', px: '16px', minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Repayment method</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A', mt: 0.25 }}>Equal monthly payment</Typography>
            </Box>
            <Icon name="chevronDown" size={20} color="#8A94A6" />
          </Box>

          {/* Monthly payment summary */}
          <Box sx={{ bgcolor: '#fff', borderRadius: '12px', px: 2, py: 1.75 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', color: '#8A94A6' }}>MONTHLY PAYMENT</Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
              <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.5px' }}>$89.07</Typography>
              <Typography sx={{ fontSize: 14, color: '#8A94A6' }}>/ month</Typography>
            </Box>
            <Box sx={{ height: '1px', bgcolor: '#ECEFF3', my: 1.5 }} />
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.4px', color: '#8A94A6' }}>TOTAL INTEREST</Typography>
                <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#0B0F1A', mt: 0.25 }}>$68.88</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.4px', color: '#8A94A6' }}>TOTAL PAYABLE</Typography>
                <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#0B0F1A', mt: 0.25 }}>$1,068.88</Typography>
              </Box>
            </Box>
          </Box>

          {/* Repayment preview table */}
          <Box>
            <GroupLabel>REPAYMENT PREVIEW</GroupLabel>
            <Box sx={{ bgcolor: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
              <RepaymentTable />
            </Box>
            <Typography sx={{ fontSize: 12, color: '#8A94A6', textAlign: 'center', mt: 1.5 }}>
              Showing 3 of 12 · <Box component="span" sx={{ color: BLUE, fontWeight: 700 }}>Download</Box> for full view
            </Typography>
          </Box>
          </>
          )}
        </Box>
      </Box>

      <MwlFooter onPrev={() => navigate(`${prefix}-about`)} onNext={() => navigate(nonMwl ? '/nonmwl-review' : '/mwl-guarantor')} />
    </Box>
  )
}

function RepaymentTable() {
  return (
    <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <Box component="thead">
        <Box component="tr">
          {TABLE_HEAD.map((h) => (
            <Box component="th" key={h} sx={{ fontSize: 11, fontWeight: 600, color: '#8A94A6', textAlign: 'center', px: 0.5, py: 1.5, verticalAlign: 'top', lineHeight: 1.3 }}>
              {h}
            </Box>
          ))}
        </Box>
      </Box>
      <Box component="tbody">
        {TABLE_ROWS.map((row) => (
          <Box component="tr" key={row[0]} sx={{ borderTop: '1px solid #F1F4F8' }}>
            {row.map((cell, i) => (
              <Box
                component="td"
                key={i}
                sx={{
                  fontSize: 12.5,
                  textAlign: 'center',
                  px: 0.5,
                  py: 1.5,
                  color: i === 3 ? '#0B0F1A' : '#6B7280',
                  fontWeight: i === 3 ? 700 : 400,
                }}
              >
                {cell}
              </Box>
            ))}
          </Box>
        ))}
        <Box component="tr" sx={{ borderTop: '1px solid #F1F4F8' }}>
          {TABLE_TOTAL.map((cell, i) => (
            <Box component="td" key={i} sx={{ fontSize: 12.5, fontWeight: 700, textAlign: 'center', px: 0.5, py: 1.5, color: BLUE }}>
              {cell}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
