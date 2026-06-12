import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import BottomNav from '../../components/BottomNav'
import { MoreMenuBody } from '../../components/home/HomeParts'
import { useSample } from '../../workspace/SampleContext'

// Full-page "More" screen — reached from the bottom-nav "More" tab.
export default function MoreScreen() {
  const navigate = useNavigate()
  const { sample } = useSample()

  // In Sample 1, More is a bottom-nav tab, so it uses the shared HomeTopBar to
  // match the My Loan and Products tabs. HomeTopBar adapts per flow: the brand
  // logo for visitors, the personalized greeting for signed-in flows.
  const greeting = sample === '1'

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <MoreMenuBody greeting={greeting} onBack={() => navigate('/home')} />
      </Box>
      {sample === '1' && <BottomNav />}
    </Box>
  )
}
