import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { MwlHeader, MwlTitle, MwlFooter, GroupLabel, FieldCard, PhoneField, SelectField } from './MwlParts'

const RELATIONSHIPS = ['Parent', 'Spouse', 'Relative']

export default function MwlGuarantorScreen() {
  const navigate = useNavigate()
  const [relationship, setRelationship] = useState('Spouse')

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <MwlHeader onBack={() => navigate('/mwl-loan')} step={3} />
        <MwlTitle>Add your guarantor</MwlTitle>

        <Box sx={{ px: 3, pb: 3, pt: 2 }}>
          <GroupLabel>GUARANTOR DETAILS</GroupLabel>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FieldCard label="Full name" required value="Krong Kampuchea" />
            <PhoneField label="Mobile number" number="012 482 991" />
            <SelectField label="Relationship" required options={RELATIONSHIPS} value={relationship} onChange={setRelationship} />
          </Box>
        </Box>
      </Box>

      <MwlFooter onPrev={() => navigate('/mwl-loan')} onNext={() => navigate('/mwl-review')} />
    </Box>
  )
}
