import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BottomNav from '../components/BottomNav'
import PayLoanSheet from '../components/PayLoanSheet'
import { Icon, type IconName } from '../components/Icon'
import { SummaryCard, Card, StatusChip, SectionLabel, AdvanceCard, HomeTopBar } from '../components/home/HomeParts'
import { useFlow } from '../workspace/FlowContext'
import { getApplications, reviewQuery } from '../workspace/applications'
import { activeStage, STAGE_CHIP } from '../workspace/tracking'

const BLUE = '#275CB2'

type Tab = 'active' | 'review' | 'complete'

const TABS: { id: Tab; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'review', label: 'Requests' },
  { id: 'complete', label: 'Paid off' },
]

// My Loans — segmented control switches between Active / In Review / Complete.
export default function MyLoanScreen() {
  const { flow } = useFlow()
  // Applicants have only an in-review application: no summary card, no active/complete loans.
  const isApplicant = flow === 'Applicant'
  // Visitors have no loans or applications at all — fully empty state.
  const isEmpty = flow === 'Visitor'
  // ?tab=review (e.g. straight after submitting an application) opens In Review.
  const [params] = useSearchParams()
  const tabParam = params.get('tab')
  const initialTab: Tab = tabParam === 'review' || tabParam === 'complete' ? tabParam : isApplicant ? 'review' : 'active'
  const [tab, setTab] = useState<Tab>(initialTab)
  const [payOpen, setPayOpen] = useState(false)

  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        {/* Header */}
        <HomeTopBar />
        <Box sx={{ px: 3, pt: 0.5, pb: 1 }}>
          <Typography sx={{ fontSize: 30, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.5px' }}>
            My Loans
          </Typography>
        </Box>
        <Box sx={{ px: 3, pb: '54px', display: 'flex', flexDirection: 'column', gap: '24px', mt: '24px' }}>
          {isEmpty ? (
            <EmptyState
              label="No loans yet"
              hint="Apply for a loan from the Products tab and it will appear here."
              showApplyButtons
            />
          ) : (
            <>
              {!isApplicant && <SummaryCard loanCount={3} />}
              {!isApplicant && <AdvanceCard />}

              <SegmentedTabs value={tab} onChange={setTab} />

              {tab === 'active' && (isApplicant ? <EmptyState label="No active loans yet" hint="Your loan appears here once your application is approved." /> : <ActiveTab onPay={() => setPayOpen(true)} />)}
              {tab === 'review' && <ReviewTab />}
              {tab === 'complete' && (isApplicant ? <EmptyState label="No completed loans" hint="Loans you've fully paid off will show up here." /> : <CompleteTab />)}
            </>
          )}
        </Box>
      </Box>

      <BottomNav />

      <PayLoanSheet open={payOpen} onClose={() => setPayOpen(false)} />
    </Box>
  )
}

// ─── Empty state — shown for Applicants on the Active / Complete tabs ─────────
function EmptyState({ label, hint, showApplyButtons }: { label: string; hint: string; showApplyButtons?: boolean }) {
  const navigate = useNavigate()
  const { flow } = useFlow()
  const isVisitor = flow === 'Visitor'
  const goNonMwl = () => navigate(isVisitor ? '/sign-up?next=' + encodeURIComponent('/nonmwl-about') : '/nonmwl-about')
  const goMwl = () => navigate(isVisitor ? '/sign-up?next=' + encodeURIComponent('/mwl-about') : '/mwl-about')
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 6, px: 2 }}>
      <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#EEF1F5', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Icon name="myLoan" size={30} color="#B4BCC9" />
      </Box>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A' }}>{label}</Typography>
      <Typography sx={{ fontSize: 13, color: '#8A94A6', mt: 0.75, maxWidth: 240, lineHeight: 1.5 }}>{hint}</Typography>
      {showApplyButtons && (
        <Button
          variant="contained"
          onClick={() => navigate('/all-loan')}
          endIcon={<Icon name="arrowRight" size={18} />}
          sx={{ mt: 3, height: 48, px: 4, borderRadius: '12px', fontSize: 15, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
        >
          Explore
        </Button>
      )}
    </Box>
  )
}

// ─── Segmented pill: Active | In Review | Complete ───────────────────────────
function SegmentedTabs({ value, onChange }: { value: Tab; onChange: (t: Tab) => void }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', height: 40, bgcolor: '#EBEBEC', borderRadius: 999, p: '4px', gap: 0.5 }}>
      {TABS.map((t) => {
        const active = value === t.id
        return (
          <Box
            key={t.id}
            onClick={() => onChange(t.id)}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s',
              color: active ? '#0B0F1A' : '#71717A',
              bgcolor: active ? '#fff' : 'transparent',
              boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
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
function ActiveTab({ onPay }: { onPay: () => void }) {
  return (
    <Box>
      <SectionLabel label="ACTIVE LOANS (3)" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ActiveLoanCard title="Small Biz Loan" icon="store" restructured onPay={onPay} />
        <ActiveLoanCard title="Housing Loan" icon="home" onPay={onPay} />
        <ActiveLoanCard title="Micro Loan" icon="sprout" status="overdue" onPay={onPay} />
      </Box>
    </Box>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ flex: 1, bgcolor: '#F7F7F8', border: 'none', borderRadius: '10px', px: 2, py: 1.5 }}>
      <Typography sx={{ fontSize: 11, color: '#8A94A6', fontWeight: 600 }}>{label}</Typography>
      <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#0B0F1A', mt: 0.25 }}>{value}</Typography>
    </Box>
  )
}

function ActiveLoanCard({ title, icon, status, restructured, onPay }: { title: string; icon: 'store' | 'home' | 'sprout'; status?: 'restructure' | 'overdue'; restructured?: boolean; onPay: () => void }) {
  const navigate = useNavigate()
  return (
    <Card onClick={() => navigate('/my-loan-detail')} sx={{ cursor: 'pointer', p: '16px' }}>
      {/* Header: icon + title/subtitle + status chips */}
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: '#EEF1FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={icon} size={22} color={BLUE} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#0B0F1A' }} noWrap>{title}</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              {restructured && <StatusChip label="1st Restructured" color="#7A4DD6" bg="#EFE7FB" />}
              <StatusChip label="Active" color="#1FA85C" bg="#DCF5E6" />
            </Box>
          </Box>
          <Typography sx={{ fontSize: 12.5, color: '#8A94A6', mt: '2px' }}>USD · 24-month term</Typography>
        </Box>
      </Box>

      {/* Progress */}
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>8 of 24 paid</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#3A4256' }}>33%</Typography>
        </Box>
        <Box sx={{ height: 6, borderRadius: 3, bgcolor: '#E7ECF2', overflow: 'hidden' }}>
          <Box sx={{ height: '100%', width: '33%', bgcolor: BLUE, borderRadius: 3 }} />
        </Box>
      </Box>

      {/* Status banner */}
      {status && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, px: 1.5, py: 1, borderRadius: 2, bgcolor: status === 'overdue' ? '#FFF1E6' : '#F5F5F5' }}>
          <Icon name="alert" size={16} color={status === 'overdue' ? '#E8770B' : '#8A94A6'} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: status === 'overdue' ? '#E8770B' : '#8A94A6' }}>
            {status === 'overdue' ? 'This loan is overdue, penalty may charge' : 'This loan is under review for restructuring'}
          </Typography>
        </Box>
      )}

      {/* Footer: next due + amount left */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Typography sx={{ fontSize: 12.5, color: '#8A94A6' }}>Next due · 20 May</Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0B0F1A' }}>$4,500.00 left</Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={(e) => { e.stopPropagation(); onPay() }}
        startIcon={<Icon name="cash" size={18} />}
        sx={{ mt: 2, height: 44, borderRadius: '12px', fontSize: 14, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
      >
        Pay Now
      </Button>
    </Card>
  )
}

// ─── In Review tab ───────────────────────────────────────────────────────────
type ReqStatus = { label: string; color: string; bg: string }
const REQ_STATUS = {
  assessment: { label: 'Under Assessment', color: '#275CB2', bg: '#D8E9FF' },
  notEligible: { label: 'Not eligible', color: '#E11D48', bg: '#FDE7EC' },
  rejected: { label: 'Rejected', color: '#E11D48', bg: '#FDE7EC' },
  cancelled: { label: 'Cancelled', color: '#6B7280', bg: '#EDEFF2' },
  disbursed: { label: 'Disbursed', color: '#1FA85C', bg: '#DCF5E6' },
}

// Reference icon per loan product (mirrors the Loan Calculator).
const PRODUCT_ICON: Record<string, IconName> = {
  'Micro Loan': 'sprout',
  'Small Biz Loan': 'store',
  'SME Loan': 'briefcase',
  'Small & Medium Enterprise Loan': 'briefcase',
  'Housing Loan': 'home',
  'Migrant Worker Loan': 'plane',
  'Wash Loan': 'cash',
  Restructuring: 'layers',
}
const iconFor = (title: string): IconName => PRODUCT_ICON[title] ?? 'cash'

// Past requests with terminal outcomes.
const REQUEST_HISTORY: { title: string; sub: string; status: ReqStatus }[] = [
  { title: 'SME Loan', sub: 'SME-2026-309818 · 14 Apr 2026', status: REQ_STATUS.notEligible },
  { title: 'Micro Loan', sub: 'MCL-2026-204417 · 22 Apr 2026', status: REQ_STATUS.rejected },
  { title: 'Wash Loan', sub: 'WL-2026-118250 · 10 Mar 2026', status: REQ_STATUS.cancelled },
  { title: 'Small Biz Loan', sub: 'SBL-2025-201311 · 12 Jan 2025', status: REQ_STATUS.disbursed },
]

// A request row — same visual language as the active loan card (icon + title +
// subtitle + status chip), compact for a list.
function RequestRow({ icon, title, sub, status, amount, onClick }: { icon: IconName; title: string; sub: string; status: ReqStatus; amount?: string; onClick?: () => void }) {
  return (
    <Card onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default', p: '14px 16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 42, height: 42, borderRadius: '12px', bgcolor: '#EEF1FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={icon} size={21} color={BLUE} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0B0F1A' }} noWrap>{title}</Typography>
          <Typography sx={{ fontSize: 12, color: '#8A94A6', mt: '1px' }} noWrap>{sub}</Typography>
        </Box>
        <StatusChip label={status.label} color={status.color} bg={status.bg} />
        {onClick && <Icon name="chevronRight" size={18} color="#C9D2DE" />}
      </Box>
      {amount && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5, pt: 1.5, borderTop: '1px solid #F0F2F5' }}>
          <Typography sx={{ fontSize: 12, color: '#8A94A6', fontWeight: 600 }}>Requested amount</Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#0B0F1A' }}>{amount}</Typography>
        </Box>
      )}
    </Card>
  )
}

function SectionHeader({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <Typography sx={{ fontSize: 15, fontWeight: 800, color: muted ? '#9AA3B2' : '#0B0F1A', mb: 1.5 }}>{children}</Typography>
  )
}

function ReviewTab() {
  const navigate = useNavigate()
  // Current = applications the user submitted + a restructuring request.
  // Their status follows the application-tracking stage (shared with the tracker).
  const apps = getApplications()
  const trackChip = STAGE_CHIP[activeStage().key]
  const current = [
    ...apps.map((a) => ({
      icon: iconFor(a.title),
      title: a.title,
      sub: `${a.ref} · ${a.on}`,
      amount: a.amount,
      status: trackChip,
      onClick: () => navigate(`${a.track ? '/mwl-tracker' : '/my-loan-review'}?${reviewQuery(a)}`),
    })),
    { icon: 'layers' as IconName, title: 'Restructuring', sub: 'Small Biz Loan · 026-01285956', amount: '$8,000.00', status: trackChip, onClick: () => navigate('/mwl-tracker?ref=026-01285956&tag=Restructure') },
    { icon: 'cash' as IconName, title: 'Pay off', sub: 'Small Biz Loan · 026-01285956', amount: '$3,200.00', status: trackChip, onClick: () => navigate('/mwl-tracker?ref=026-01285956&tag=Pay-off') },
  ]

  return (
    <Box>
      <SectionHeader>Current ({current.length})</SectionHeader>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {current.map((c, i) => (
          <RequestRow key={i} icon={c.icon} title={c.title} sub={c.sub} amount={c.amount} status={c.status} onClick={c.onClick} />
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <SectionHeader muted>History</SectionHeader>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {REQUEST_HISTORY.map((h) => (
            <RequestRow key={h.sub} icon={iconFor(h.title)} title={h.title} sub={h.sub} status={h.status} />
          ))}
        </Box>
      </Box>

      <Typography sx={{ fontSize: 11.5, color: '#9AA3B2', textAlign: 'center', mt: 2.5, lineHeight: 1.5 }}>
        Requests are kept for 36 months · Older records: ask your branch.
      </Typography>
    </Box>
  )
}

// ─── Complete tab ────────────────────────────────────────────────────────────
function CompletedCard({ title, amount, term, rate, lastPaid }: { title: string; amount: string; term: string; rate: string; lastPaid: string }) {
  const navigate = useNavigate()
  return (
    <Card onClick={() => navigate('/my-loan-complete')} sx={{ cursor: 'pointer', p: '18px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A' }}>{title}</Typography>
        <StatusChip label="Paid Off" color="#1FA85C" bg="#DCF5E6" />
      </Box>

      <Box sx={{ bgcolor: '#F7F7F8', border: 'none', borderRadius: '10px', px: 2, py: 1.5, mt: 2 }}>
        <Typography sx={{ fontSize: 11, color: '#8A94A6', fontWeight: 600 }}>Requested amount</Typography>
        <Typography sx={{ fontSize: 19, fontWeight: 800, color: '#0B0F1A', mt: 0.25 }}>{amount}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
        <StatBox label="Term" value={term} />
        <StatBox label="Rate" value={rate} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Icon name="clock" size={14} color="#8A94A6" />
          <Typography sx={{ fontSize: 12, color: '#8A94A6' }}>Last Paid on {lastPaid}</Typography>
        </Box>
        <Button variant="outlined" onClick={(e) => { e.stopPropagation(); navigate('/my-loan-complete') }} endIcon={<Icon name="arrowRight" size={16} />} sx={{ height: 40, borderRadius: '10px', px: 2.5, fontSize: 14 }}>
          View Details
        </Button>
      </Box>
    </Card>
  )
}

function CompleteTab() {
  return (
    <Box>
      <SectionLabel label="COMPLETED (2)" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <CompletedCard title="Small Business Loan" amount="$4,500.00" term="24 months" rate="1.20%/mo" lastPaid="20 May" />
        <CompletedCard title="Micro Loan" amount="$1,500.00" term="12 months" rate="1.30%/mo" lastPaid="08 Feb" />
      </Box>
    </Box>
  )
}
