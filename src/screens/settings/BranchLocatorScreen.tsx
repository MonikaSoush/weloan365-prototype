import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'

// ─────────────────────────────────────────────────────────────────────────────
// Branch Locator — map preview + nearest branch (opened from Settings).
// ─────────────────────────────────────────────────────────────────────────────
const HEADING = '#0B0F1A'
const MUTED = '#8A94A6'
const BLUE = '#275CB2'

type Branch = { name: string; address: string; distance: string }
const BRANCHES: Branch[] = [
  { name: 'NongHyup Finance Odongk', address: 'National Road 4, Odongk District, Kampong Speu', distance: '2.4 km' },
  { name: 'NongHyup Finance Phnom Penh', address: 'No. 12, Norodom Blvd, Phnom Penh', distance: '8.1 km' },
  { name: 'NongHyup Finance Kampong Cham', address: 'Preah Monivong St, Kampong Cham', distance: '46 km' },
]

export default function BranchLocatorScreen() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = BRANCHES.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: '#F5F5F5', px: 3, pt: 3, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ ml: -1, color: HEADING }}>
            <Icon name="chevronLeft" size={26} color={HEADING} />
          </IconButton>
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: HEADING, letterSpacing: '-0.3px', flex: 1 }}>Find a branch</Typography>
        </Box>

        <Box sx={{ px: 3, pb: 5 }}>
          {/* Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#ECEEF1', borderRadius: '12px', px: '14px', height: 48, mt: 1 }}>
            <Icon name="search" size={20} color={MUTED} />
            <Box
              component="input"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Search branches"
              aria-label="Search branches"
              sx={{ flex: 1, border: 'none', outline: 'none', bgcolor: 'transparent', fontSize: 16, color: HEADING, fontFamily: 'inherit', '::placeholder': { color: MUTED } }}
            />
          </Box>

          {/* Map preview */}
          <Box
            sx={{
              position: 'relative',
              mt: 2,
              height: 220,
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #DCEAF9 0%, #EAF1FB 45%, #E2EEDB 100%)',
            }}
          >
            {/* faux roads */}
            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'linear-gradient(90deg, transparent 49%, #CBD6E4 49%, #CBD6E4 51%, transparent 51%), linear-gradient(0deg, transparent 49%, #CBD6E4 49%, #CBD6E4 51%, transparent 51%)', backgroundSize: '70px 70px' }} />
            {/* pin */}
            <Box sx={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ bgcolor: BLUE, color: '#fff', px: 1.25, py: 0.5, borderRadius: 1.5, mb: 0.5, whiteSpace: 'nowrap' }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700 }}>NongHyup Finance Odongk</Typography>
              </Box>
              <Icon name="findBranch" size={34} color={BLUE} />
            </Box>
          </Box>

          {/* Branch list */}
          <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', color: '#9AA3B2', px: 0.5, py: 1, mt: 1 }}>
            NEARBY BRANCHES
          </Typography>
          <Box sx={{ bgcolor: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
            {filtered.map((b, i) => (
              <Box
                key={b.name}
                role="button"
                onClick={() => {}}
                sx={{ display: 'flex', alignItems: 'center', gap: 2, px: '14px', py: '12px', cursor: 'pointer', borderBottom: i < filtered.length - 1 ? '1px solid #F1F4F8' : 'none', '&:active': { bgcolor: '#EAF1FB' } }}
              >
                <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#EAF1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="findBranch" size={20} color={BLUE} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: HEADING }} noWrap>{b.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: MUTED, mt: 0.25 }} noWrap>{b.address}</Typography>
                </Box>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: BLUE, flexShrink: 0 }}>{b.distance}</Typography>
              </Box>
            ))}
            {filtered.length === 0 && (
              <Typography sx={{ fontSize: 14, color: MUTED, textAlign: 'center', py: 4 }}>No branches match “{query}”.</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
