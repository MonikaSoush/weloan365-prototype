import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'
import { SettingsSections } from '../SettingsScreen'
import { useCollapse, CollapsingHeader, CollapsingTitle } from '../../components/CollapsingHeader'

const BLUE = '#275CB2'
const HEADING = '#0B0F1A'
const MUTED = '#8A94A6'

function NavRow({ icon, label, divider, onClick }: { icon: Parameters<typeof Icon>[0]['name']; label: string; divider?: boolean; onClick?: () => void }) {
  return (
    <Box
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      sx={{
        display: 'flex', alignItems: 'center', gap: 2,
        px: '14px', py: '13px',
        borderBottom: divider ? '1px solid #F1F4F8' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        '&:active': onClick ? { bgcolor: '#F5F7FA' } : {},
      }}
    >
      <Icon name={icon} size={22} color={HEADING} />
      <Typography sx={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: HEADING }}>{label}</Typography>
      {onClick && <Icon name="chevronRight" size={18} color={MUTED} />}
    </Box>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.6px', color: MUTED, px: 0.5, pb: 1 }}>
      {children}
    </Typography>
  )
}

export default function AppSettingsScreen() {
  const navigate = useNavigate()
  const { collapse, onScroll } = useCollapse()

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }} onScroll={onScroll}>
        <CollapsingHeader title="App Setting" collapse={collapse} onBack={() => navigate(-1)} />
        <CollapsingTitle collapse={collapse}>App Setting</CollapsingTitle>

        <Box sx={{ px: 3, pb: '48px', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Account Setting + About + Sign out */}
          <SettingsSections />
        </Box>
      </Box>
    </Box>
  )
}
