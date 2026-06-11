import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BottomNav from '../components/BottomNav'
import { Icon } from '../components/Icon'
import { HomeTopBar, SummaryCard, Card, StatusChip, SectionLabel } from '../components/home/HomeParts'

const BLUE = '#0052CC'

type Tab = 'active' | 'review' | 'complete'

const TABS: { id: Tab; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'review', label: 'In Review' },
  { id: 'complete', label: 'Complete' },
]

// My Loans — segmented control switches between Active / In Review / Complete.
export default function MyLoanScreen() {
  const [tab, setTab] = useState<Tab>('active')

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <HomeTopBar secondIcon="phone" />
        <Box sx={{ px: 4, pb: 5, display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.5px' }}>
            My Loans
          </Typography>

          <SummaryCard loanCount={3} defaultExpanded />

          <SegmentedTabs value={tab} onChange={setTab} />

          {tab === 'active' && <ActiveTab />}
          {tab === 'review' && <ReviewTab />}
          {tab === 'complete' && <CompleteTab />}
        </Box>
      </Box>

      <BottomNav />
    </Box>
  )
}

// ─── Segmented pill: Active | In Review | Complete ───────────────────────────
function SegmentedTabs({ value, onChange }: { value: Tab; onChange: (t: Tab) => void }) {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#EEF1F5', borderRadius: 2.5, p: 0.5, gap: 0.5 }}>
      {TABS.map((t) => {
        const active = value === t.id
        return (
          <Box
            key={t.id}
            onClick={() => onChange(t.id)}
            sx={{
              flex: 1,
              textAlign: 'center',
              py: 1,
              borderRadius: 2,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s',
              color: active ? '#0B0F1A' : '#8A94A6',
              bgcolor: active ? '#fff' : 'transparent',
              boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {t.label}
          </Box>
        )
      })}
    </Box>
  )
}

// ─── Active tab ──────────────────────────────────────────────────────────────
function ActiveTab() {
  return (
    <Box>
      <SectionLabel label="ACTIVE LOANS (3)" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ActiveLoanCard />
        <ActiveLoanCard banner={{ tone: 'neutral', text: 'This loan is under review for restructuring' }} />
        <ActiveLoanCard banner={{ tone: 'warning', text: 'This loan is overdue, penalty may charge' }} />
      </Box>
    </Box>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ flex: 1, bgcolor: '#F4F6F9', border: '1px solid #ECEFF3', borderRadius: 2.5, px: 2, py: 1.5 }}>
      <Typography sx={{ fontSize: 11, color: '#8A94A6', fontWeight: 600 }}>{label}</Typography>
      <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#0B0F1A', mt: 0.25 }}>{value}</Typography>
    </Box>
  )
}

function ActiveLoanCard({ banner }: { banner?: { tone: 'neutral' | 'warning'; text: string } }) {
  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A' }}>Small Business Loan</Typography>
        <StatusChip label="Active" color="#275CB2" bg="#D8E9FF" />
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
        <StatBox label="Outstanding" value="$4,500.00" />
        <StatBox label="Paid" value="$2,800.00" />
      </Box>

      {/* progress */}
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>8 of 24</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#3A4256' }}>33%</Typography>
        </Box>
        <Box sx={{ height: 6, borderRadius: 3, bgcolor: '#E7ECF2', overflow: 'hidden' }}>
          <Box sx={{ height: '100%', width: '33%', bgcolor: '#000', borderRadius: 3 }} />
        </Box>
      </Box>

      {banner && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 2,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            bgcolor: banner.tone === 'warning' ? '#FFF1E6' : '#F5F5F5',
          }}
        >
          <Icon name="alert" size={16} color={banner.tone === 'warning' ? '#E8770B' : '#8A94A6'} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: banner.tone === 'warning' ? '#E8770B' : '#8A94A6' }}>
            {banner.text}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Icon name="clock" size={14} color="#8A94A6" />
          <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Due Date 20 May</Typography>
        </Box>
        <Button variant="contained" startIcon={<Icon name="pay" size={18} />} sx={{ height: 40, borderRadius: '10px', px: 2.5, fontSize: 14 }}>
          Pay $320.00
        </Button>
      </Box>
    </Card>
  )
}

// ─── In Review tab ───────────────────────────────────────────────────────────
function ReviewTab() {
  return (
    <Box>
      <SectionLabel label="IN REVIEW (1)" />
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A' }}>Small Business Loan</Typography>
          <StatusChip label="In review" color="#B7791F" bg="#FBEBC6" />
        </Box>

        <Box sx={{ bgcolor: '#F4F6F9', border: '1px solid #ECEFF3', borderRadius: 2.5, px: 2, py: 1.5, mt: 2 }}>
          <Typography sx={{ fontSize: 11, color: '#8A94A6', fontWeight: 600 }}>Requested amount</Typography>
          <Typography sx={{ fontSize: 19, fontWeight: 800, color: '#0B0F1A', mt: 0.25 }}>$4,500.00</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Step 2 of 10</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#3A4256' }}>Credit assessment</Typography>
          </Box>
          <Box sx={{ height: 6, borderRadius: 3, bgcolor: '#E7ECF2', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: '20%', bgcolor: '#B7791F', borderRadius: 3 }} />
          </Box>
        </Box>

        <Button
          variant="outlined"
          endIcon={<Icon name="arrowRight" size={16} />}
          fullWidth
          sx={{ mt: 2.5, height: 44, borderRadius: '10px', fontSize: 14 }}
        >
          View Details
        </Button>
      </Card>
    </Box>
  )
}

// ─── Complete tab ────────────────────────────────────────────────────────────
function CompleteTab() {
  return (
    <Box>
      <SectionLabel label="COMPLETED (1)" />
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A' }}>Small Business Loan</Typography>
          <StatusChip label="Paid Off" color="#1FA85C" bg="#DCF5E6" />
        </Box>

        <Box sx={{ bgcolor: '#F4F6F9', border: '1px solid #ECEFF3', borderRadius: 2.5, px: 2, py: 1.5, mt: 2 }}>
          <Typography sx={{ fontSize: 11, color: '#8A94A6', fontWeight: 600 }}>Requested amount</Typography>
          <Typography sx={{ fontSize: 19, fontWeight: 800, color: '#0B0F1A', mt: 0.25 }}>$4,500.00</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
          <StatBox label="Term" value="24 months" />
          <StatBox label="Rate" value="1.20%/mo" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Icon name="clock" size={14} color="#8A94A6" />
            <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Last Paid on 20 May</Typography>
          </Box>
          <Button variant="outlined" endIcon={<Icon name="arrowRight" size={16} />} sx={{ height: 40, borderRadius: '10px', px: 2.5, fontSize: 14 }}>
            View Details
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
