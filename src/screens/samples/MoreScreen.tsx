import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import BottomNav from '../../components/BottomNav'
import { MoreMenuBody } from '../../components/home/HomeParts'

// Full-page "More" screen — reached from the bottom-nav "More" tab.
export default function MoreScreen() {
  const navigate = useNavigate()

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <MoreMenuBody onBack={() => navigate('/home')} />
      </Box>
      <BottomNav />
    </Box>
  )
}
