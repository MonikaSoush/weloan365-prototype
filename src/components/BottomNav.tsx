import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon, type IconName } from './Icon'
import { useFlow } from '../workspace/FlowContext'

const BLUE = '#0052CC'
const MUTED = '#8A94A6'

const TABS: { id: string; label: string; icon: IconName; path: string }[] = [
  { id: 'home', label: 'Home', icon: 'home', path: '/home' },
  { id: 'products', label: 'Products', icon: 'products', path: '/products' },
  { id: 'loan', label: 'My Loan', icon: 'myLoan', path: '/my-loan' },
  { id: 'more', label: 'More', icon: 'more', path: '/more' },
]

// Bottom tab bar — present in "Sample 1", absent in "Sample 2".
export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { flow } = useFlow()

  // Visitors have no loans, so hide the My Loan tab for that flow.
  const tabs = flow === 'Visitor' ? TABS.filter((t) => t.id !== 'loan') : TABS

  return (
    <Box
      sx={{
        flexShrink: 0,
        bgcolor: '#fff',
        borderTop: '1px solid #ECEFF3',
        // Extend white into the home-indicator safe area so the gesture bar blends.
        pb: '34px',
        display: 'flex',
        alignItems: 'stretch',
        // Nav row height; safe-area padding sits below it.
        '& > *': { minHeight: 64 },
      }}
    >
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.path)
        return (
          <Box
            key={tab.id}
            onClick={() => navigate(tab.path)}
            role="button"
            aria-label={tab.label}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: active ? BLUE : MUTED,
              '&:active': { opacity: 0.6 },
            }}
          >
            <Icon name={tab.icon} size={24} color={active ? BLUE : MUTED} />
            <Typography sx={{ fontSize: 11, fontWeight: active ? 700 : 600, color: 'inherit' }}>
              {tab.label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}
