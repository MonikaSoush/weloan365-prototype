import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import BottomNav from '../../components/BottomNav'
import { MoreMenuBody } from '../../components/home/HomeParts'
import { useSample } from '../../workspace/SampleContext'
import { useFlow } from '../../workspace/FlowContext'

// Full-page "More" screen — reached from the bottom-nav "More" tab.
export default function MoreScreen() {
  const navigate = useNavigate()
  const { sample } = useSample()
  const { flow } = useFlow()

  // Logged-in flows (Applicant / Borrower) in Sample 1 get the personalized
  // greeting header to match the Products and My Loan tabs.
  const greeting = sample === '1' && (flow === 'Applicant' || flow === 'Borrower')

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <MoreMenuBody greeting={greeting} onBack={() => navigate('/home')} />
      </Box>
      {sample === '1' && <BottomNav />}
    </Box>
  )
}
