import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../components/Icon'

// ─────────────────────────────────────────────────────────────────────────────
// New message — contact picker opened by the compose FAB on the Chat inbox.
// Pick a support team or officer to start a new conversation.
// ─────────────────────────────────────────────────────────────────────────────
const HEADING = '#0B0F1A'
const MUTED = '#8A94A6'
const BLUE = '#275CB2'
const GREEN = '#1FA85C'

type Contact = {
  id: string
  name: string
  role: string
  online?: boolean
  tint?: string
}

const QUICK_TOPICS = ['Loan question', 'Repayment', 'Documents', 'Book a visit']

const CONTACTS: { heading: string; people: Contact[] }[] = [
  {
    heading: 'SUPPORT',
    people: [
      { id: 'nhfc', name: 'NHFC Support', role: 'Customer Support · replies in minutes', online: true, tint: '#275CB2' },
      { id: 'pisey', name: 'Pisey Sok', role: 'Customer Support', online: true, tint: '#7A3FF2' },
    ],
  },
  {
    heading: 'MY BRANCH',
    people: [
      { id: 'channa', name: 'Channa Vong', role: 'Loan officer', tint: '#1FA84F' },
      { id: 'sopheap', name: 'Sopheap Tep', role: 'Branch manager', online: true, tint: '#E08A1E' },
    ],
  },
]

export default function NewMessageScreen() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = CONTACTS.map((g) => ({
    ...g,
    people: g.people.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
  })).filter((g) => g.people.length > 0)

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        {/* Header */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: '#F5F5F5', px: 3, pt: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ ml: -1, color: HEADING }}>
              <Icon name="chevronLeft" size={26} color={HEADING} />
            </IconButton>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: HEADING, letterSpacing: '-0.3px' }}>
              New message
            </Typography>
          </Box>
        </Box>

        <Box sx={{ px: 3, pt: 1.5 }}>
          {/* Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#ECEEF1', borderRadius: '12px', px: '14px', height: 48 }}>
            <Icon name="search" size={20} color={MUTED} />
            <Box
              component="input"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Search people"
              aria-label="Search people"
              sx={{ flex: 1, border: 'none', outline: 'none', bgcolor: 'transparent', fontSize: 16, color: HEADING, fontFamily: 'inherit', '::placeholder': { color: MUTED } }}
            />
          </Box>

          {/* Quick topics */}
          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', color: MUTED, mt: 2.5, mb: 1.25 }}>
            START WITH A TOPIC
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {QUICK_TOPICS.map((t) => (
              <Box
                key={t}
                role="button"
                onClick={() => navigate('/chat-thread')}
                sx={{
                  px: 1.75,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '999px',
                  bgcolor: '#fff',
                  border: '1px solid #E7ECF2',
                  cursor: 'pointer',
                  '&:active': { bgcolor: '#ECEEF1' },
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#3A4256' }}>{t}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Contacts */}
        <Box sx={{ px: 3, pb: 5, mt: 1 }}>
          {filtered.map((g) => (
            <Box key={g.heading}>
              <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', color: MUTED, mt: 2, mb: 0.5 }}>
                {g.heading}
              </Typography>
              {g.people.map((p) => (
                <ContactRow key={p.id} c={p} onClick={() => navigate('/chat-thread')} />
              ))}
            </Box>
          ))}
          {filtered.length === 0 && (
            <Typography sx={{ fontSize: 14, color: MUTED, textAlign: 'center', mt: 5 }}>
              No people match “{query}”.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

function ContactRow({ c, onClick }: { c: Contact; onClick: () => void }) {
  const initials = c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  const tint = c.tint ?? GREEN
  return (
    <Box
      role="button"
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.75,
        py: 1.75,
        borderBottom: '1px solid #ECEEF1',
        cursor: 'pointer',
        '&:active': { bgcolor: '#ECEEF1' },
      }}
    >
      {/* Avatar */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box sx={{ width: 52, height: 52, borderRadius: '50%', bgcolor: tint + '1F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: tint }}>{initials}</Typography>
        </Box>
        {c.online && (
          <Box sx={{ position: 'absolute', right: 1, bottom: 1, width: 13, height: 13, borderRadius: '50%', bgcolor: GREEN, border: '2.5px solid #F5F5F5' }} />
        )}
      </Box>

      {/* Text */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 16.5, fontWeight: 800, color: HEADING }} noWrap>{c.name}</Typography>
        <Typography sx={{ fontSize: 13.5, color: MUTED, lineHeight: 1.3, mt: 0.25 }} noWrap>{c.role}</Typography>
      </Box>

      <Icon name="chevronRight" size={20} color="#C2C9D4" />
    </Box>
  )
}
