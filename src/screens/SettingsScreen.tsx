import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Badge from '@mui/material/Badge'
import { Icon, type IconName } from '../components/Icon'
import { AssetImg, ILLUS } from '../components/home/media'
import { AvatarArt } from '../components/home/illustrations'

const HEADING = '#0B0F1A'
const MUTED = '#8A94A6'
const BLUE = '#0052CC'
const DANGER = '#E11D48'

// ─── Reusable settings cards ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', color: '#9AA3B2', px: 0.5, py: 1 }}>
      {children}
    </Typography>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '12px', overflow: 'hidden' }}>{children}</Box>
  )
}

function RowShell({
  icon,
  label,
  sub,
  divider,
  onClick,
  right,
}: {
  icon: IconName
  label: string
  sub?: string
  divider?: boolean
  onClick?: () => void
  right: React.ReactNode
}) {
  return (
    <Box
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: '14px',
        py: '12px',
        cursor: onClick ? 'pointer' : 'default',
        borderBottom: divider ? '1px solid #F1F4F8' : 'none',
        transition: 'background 0.12s',
        ...(onClick && { '&:hover': { bgcolor: '#F8FAFC' }, '&:active': { bgcolor: '#EAF1FB' } }),
      }}
    >
      <Icon name={icon} size={24} color="#1A1A1A" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: HEADING, lineHeight: 1.3 }}>{label}</Typography>
        {sub && <Typography sx={{ fontSize: 12, color: MUTED, mt: 0.25 }} noWrap>{sub}</Typography>}
      </Box>
      {right}
    </Box>
  )
}

function NavRow(props: { icon: IconName; label: string; sub?: string; divider?: boolean; onClick?: () => void }) {
  return <RowShell {...props} right={<Icon name="chevronRight" size={20} color="#C2C9D4" />} />
}

function ToggleRow({
  icon,
  label,
  sub,
  divider,
  checked,
  onToggle,
}: {
  icon: IconName
  label: string
  sub?: string
  divider?: boolean
  checked: boolean
  onToggle: (v: boolean) => void
}) {
  return (
    <RowShell
      icon={icon}
      label={label}
      sub={sub}
      divider={divider}
      right={
        <Switch
          checked={checked}
          onChange={(e) => onToggle(e.target.checked)}
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: BLUE, opacity: 1 } }}
        />
      }
    />
  )
}

function SelectRow({
  icon,
  label,
  sub,
  divider,
  value,
  flag,
}: {
  icon: IconName
  label: string
  sub?: string
  divider?: boolean
  value: string
  flag?: string
}) {
  return (
    <RowShell
      icon={icon}
      label={label}
      sub={sub}
      divider={divider}
      onClick={() => {}}
      right={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {flag && <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>{flag}</Box>}
          <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: HEADING }}>{value}</Typography>
          <Icon name="chevronsUpDown" size={18} color="#8A94A6" />
        </Box>
      }
    />
  )
}

export default function SettingsScreen() {
  const navigate = useNavigate()
  const [paymentReminders, setPaymentReminders] = useState(false)
  const [promotions, setPromotions] = useState(true)
  const [chatNotifs, setChatNotifs] = useState(false)

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top icon row — back + chat + bell */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: '#F5F5F5', px: 3, pt: 3, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ ml: -1, color: '#0B0F1A' }}>
            <Icon name="chevronLeft" size={26} color="#0B0F1A" />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small" sx={{ color: '#1A1A1A' }} aria-label="Messages">
              <Badge badgeContent={2} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 9, height: 15, minWidth: 15 } }}>
                <Box component="img" src="/assets/brand/ico_chat.svg" alt="" sx={{ width: 22, height: 22, display: 'block' }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigate('/notifications')} size="small" sx={{ color: '#1A1A1A' }} aria-label="Notifications">
              <Box component="img" src="/assets/brand/ico_bell.svg" alt="" sx={{ width: 20, height: 20, display: 'block' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Profile row */}
        <Box
          role="button"
          onClick={() => navigate('/profile')}
          sx={{ px: 3, pt: 1, pb: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:active': { opacity: 0.7 } }}
        >
          <Box sx={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <AssetImg src={ILLUS.avatar01} alt="avatar" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} fallback={<AvatarArt />} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 13, color: MUTED, lineHeight: 1.2 }}>Good morning!</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: HEADING, lineHeight: 1.2 }} noWrap>
              Krong Kampuchea
            </Typography>
          </Box>
          <IconButton
            onClick={(e) => { e.stopPropagation(); navigate('/app-settings') }}
            size="small"
            aria-label="App settings"
            sx={{ color: '#1A1A1A' }}
          >
            <Icon name="appSettings" size={24} color="#1A1A1A" />
          </IconButton>
        </Box>

        {/* Sections */}
        <Box sx={{ px: 3, pb: 2 }}>
          <SectionLabel>ACCOUNT</SectionLabel>
          <Card>
            <NavRow icon="accountSecurity" label="Account Security" onClick={() => navigate('/account-security')} />
          </Card>

          <Box sx={{ mt: 2 }}>
            <SectionLabel>NOTIFICATION SETTINGS</SectionLabel>
            <Card>
              <ToggleRow icon="bellOff" label="Payment reminders" divider checked={paymentReminders} onToggle={setPaymentReminders} />
              <ToggleRow icon="bell" label="Promotions & news" divider checked={promotions} onToggle={setPromotions} />
              <ToggleRow icon="bellOff" label="Chat notifications" checked={chatNotifs} onToggle={setChatNotifs} />
            </Card>
          </Box>

          <Box sx={{ mt: 2 }}>
            <SectionLabel>APPEARANCE</SectionLabel>
            <Card>
              <SelectRow icon="globe" label="Language" value="English" flag="🇬🇧" divider />
              <SelectRow icon="theme" label="Theme" value="System" />
            </Card>
          </Box>

          <Box sx={{ mt: 2 }}>
            <SectionLabel>SUPPORT</SectionLabel>
            <Card>
              <NavRow icon="findBranch" label="Find a branch" divider onClick={() => navigate('/branch-locator')} />
              <NavRow icon="blogs" label="Blogs & Education" divider onClick={() => navigate('/blogs')} />
              <NavRow icon="feedback" label="Feedback" divider onClick={() => navigate('/send-feedback')} />
              <NavRow icon="faq" label="FAQ" onClick={() => navigate('/faq')} />
            </Card>
          </Box>

          <Box sx={{ mt: 2 }}>
            <SectionLabel>ABOUT</SectionLabel>
            <Card>
              <NavRow icon="appPolicy" label="App policy & terms" divider onClick={() => navigate('/terms-privacy')} />
              <NavRow icon="aboutNhfc" label="About NHFC" onClick={() => navigate('/about')} />
            </Card>
          </Box>
        </Box>

        {/* Sign out */}
        <Box
          role="button"
          onClick={() => navigate('/flow-select')}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, pt: '44px', pb: '44px', cursor: 'pointer', '&:active': { opacity: 0.6 } }}
        >
          <Icon name="signOut" size={20} color={DANGER} />
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: DANGER }}>Sign out</Typography>
        </Box>

        <Typography sx={{ fontSize: 11.5, color: '#B6BDC8', textAlign: 'center', pb: 3 }}>
          NongHyup v1.0.0 · build 2026
        </Typography>
      </Box>
    </Box>
  )
}
