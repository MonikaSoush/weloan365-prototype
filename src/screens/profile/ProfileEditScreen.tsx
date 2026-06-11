import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../../components/Icon'
import { MwlHeader, MwlTitle, GroupLabel, FieldCard, SelectField } from '../mwl/MwlParts'

const MUTED = '#8A94A6'
const BLUE = '#0052CC'

export default function ProfileEditScreen() {
  const navigate = useNavigate()

  // Residential address
  const [province, setProvince] = useState('Phnom Penh')
  const [district, setDistrict] = useState('Chamkar Mon')
  const [commune, setCommune] = useState('Tonle Bassac')

  // Employment
  const [empType, setEmpType] = useState('Employed · Private sector')
  const [bizType, setBizType] = useState('Logistics & transport')
  const [bizNature, setBizNature] = useState('Trading')
  const [income, setIncome] = useState('Salary')
  const [range, setRange] = useState('250$ – $500')

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <MwlHeader onBack={() => navigate(-1)} step={2} totalSteps={2} />
        <MwlTitle>Complete Your Profile</MwlTitle>
        <Typography sx={{ fontSize: 14.5, color: MUTED, px: 3, mb: 2.5 }}>Capture your Card and Selfie</Typography>

        <Box sx={{ px: 3, pb: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Personal details */}
          <Box>
            <GroupLabel>PERSONAL DETAILS</GroupLabel>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <FieldCard label="NID" required value="010 234 5678" />
              <FieldCard label="First Name" required value="Sothea" />
              <FieldCard label="Last Name" required value="Mao" />
              <FieldCard
                label="Birth Date"
                required
                value="12 May 1988"
                trailing={<Icon name="calendar" size={20} color={MUTED} />}
              />
            </Box>
          </Box>

          {/* Residential address */}
          <Box>
            <GroupLabel>RESIDENTIAL ADDRESS</GroupLabel>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <SelectField label="City / Province" required value={province} onChange={setProvince} options={['Phnom Penh', 'Siem Reap', 'Battambang', 'Kandal']} />
              <SelectField label="District / Khan" required value={district} onChange={setDistrict} options={['Chamkar Mon', 'Daun Penh', 'Toul Kork', 'Sen Sok']} />
              <SelectField label="Commune / Sangkat" required value={commune} onChange={setCommune} options={['Tonle Bassac', 'Boeung Keng Kang', 'Phsar Daeum Thkov']} />
              <FieldCard label="Village" required value="Phum 14" />
              <FieldCard label="House/Street No." required value="No. 28C, Street 308" />
            </Box>
          </Box>

          {/* Employment details */}
          <Box>
            <GroupLabel>EMPLOYMENT DETAILS</GroupLabel>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <SelectField label="Employment Type" required value={empType} onChange={setEmpType} options={['Employed · Private sector', 'Employed · Public sector', 'Self-employed', 'Business owner']} />
              <FieldCard label="Occupation / Position" required value="Senior accountant" />
              <FieldCard label="Specify Comment" required value="—" />
              <FieldCard label="Company Name" required value="ABC Logistics Co., Ltd." />
              <SelectField label="Business Type" required value={bizType} onChange={setBizType} options={['Logistics & transport', 'Retail & trading', 'Manufacturing', 'Services']} />
              <SelectField label="Business Nature" required value={bizNature} onChange={setBizNature} options={['Trading', 'Production', 'Service', 'Agriculture']} />
              <SelectField label="Main source of income" required value={income} onChange={setIncome} options={['Salary', 'Business income', 'Rental income', 'Other']} />
              <SelectField label="Monthly Range" required value={range} onChange={setRange} options={['< $250', '250$ – $500', '$500 – $1,000', '> $1,000']} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer — Cancel + Save changes */}
      <Box sx={{ flexShrink: 0, display: 'flex', gap: 1.5, px: 3, pt: 2.5, pb: '44px', bgcolor: '#F5F5F5' }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ height: 48, borderRadius: '12px', px: 3, fontSize: 14, fontWeight: 700, color: '#0B0F1A', borderColor: '#E2E6EC', bgcolor: '#fff' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/profile')}
          startIcon={<Icon name="checkCircle" size={18} color="#fff" />}
          sx={{ flex: 1, height: 48, borderRadius: '12px', fontSize: 14, fontWeight: 700, bgcolor: BLUE }}
        >
          Save changes
        </Button>
      </Box>
    </Box>
  )
}
