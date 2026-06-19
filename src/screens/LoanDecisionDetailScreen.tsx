import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon, type IconName } from '../components/Icon'

const BLUE = '#275CB2'
const RED = '#E11D48'

type DecisionDetail = {
  title: string
  ref: string
  date: string
  status: 'notEligible' | 'rejected' | 'cancelled'
  icon: IconName
  // notice box
  headline: string
  body: string
  // why section
  whyLabel: string
  why: string
  // actions
  actions: string[]
  // cta
  ctaLabel: string
}

const STATUS_META = {
  notEligible: { label: 'Not eligible', color: RED,       bg: '#FDE7EC' },
  rejected:    { label: 'Rejected',     color: RED,       bg: '#FDE7EC' },
  cancelled:   { label: 'Cancelled',    color: '#6B7280', bg: '#EDEFF2' },
}

const NOTICE_STYLE = {
  notEligible: { bg: '#FEF2F4', border: '#FCCDD6', titleColor: RED,       bodyColor: '#6B2333' },
  rejected:    { bg: '#FEF2F4', border: '#FCCDD6', titleColor: RED,       bodyColor: '#6B2333' },
  cancelled:   { bg: '#F5F6F8', border: '#E2E6EC', titleColor: '#374151', bodyColor: '#6B7280' },
}

const DECISIONS: DecisionDetail[] = [
  {
    title: 'SME Loan',
    ref: 'SME-2026-309818',
    date: '14 Apr 2026',
    status: 'notEligible',
    icon: 'briefcase',
    headline: "This request didn't meet eligibility",
    body: 'NH reviewed this request on 16 Apr 2026 and it did not meet the basic eligibility criteria for the SME Loan, so it did not move to full assessment.',
    whyLabel: "WHY IT WASN'T ELIGIBLE",
    why: 'The business had been operating for less than the 1 year minimum required for an SME Loan at the time of applying.',
    actions: [
      'Reapply once your business reaches 12 months of operating history.',
      'Apply for a Micro Loan, which has a shorter operating-history requirement.',
      'Add an eligible guarantor to strengthen a future request.',
    ],
    ctaLabel: 'Explore eligible loans',
  },
  {
    title: 'Micro Loan',
    ref: 'MCL-2026-204417',
    date: '22 Apr 2026',
    status: 'rejected',
    icon: 'sprout',
    headline: 'Application not approved',
    body: 'After assessment — including the CBC credit report — NH was unable to approve this request on 25 Apr 2026.',
    whyLabel: 'MAIN REASON',
    why: 'Your current total debt-to-income ratio is above NH\'s lending limit. This was the primary factor in the decision.',
    actions: [
      'Reapply after 3 months, or sooner with an eligible guarantor.',
      'Lower existing monthly obligations to improve your ratio.',
      'Ask your officer about a smaller amount or a longer tenure.',
    ],
    ctaLabel: 'Reapply for this loan',
  },
  {
    title: 'Wash Loan',
    ref: 'WL-2026-118250',
    date: '10 Mar 2026',
    status: 'cancelled',
    icon: 'cash',
    headline: 'Approved loan cancelled',
    body: 'This loan was approved on 12 Mar 2026 but later cancelled before disbursement. Nothing was disbursed and there is no impact on your credit record.',
    whyLabel: 'WHY IT WAS CANCELLED',
    why: 'The conditions of the conditional approval were not met within the validity period, so the approved loan was not disbursed.',
    actions: [
      'Start a new request once you can meet the approval conditions.',
      'Ask your branch officer which condition was outstanding.',
      'Documents already on file can be reused for a new application.',
    ],
    ctaLabel: 'Start a new request',
  },
]

export default function LoanDecisionDetailScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const ref = params.get('ref') ?? ''
  const d = DECISIONS.find((x) => x.ref === ref) ?? DECISIONS[0]
  const meta = STATUS_META[d.status]
  const notice = NOTICE_STYLE[d.status]

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F6F8' }}>
      {/* Top bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, pt: 2, pb: 1.5, flexShrink: 0 }}>
        <Box onClick={() => navigate(-1)} role="button" sx={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%', '&:active': { bgcolor: '#F0F2F5' } }}>
          <Icon name="chevronLeft" size={22} color="#0B0F1A" />
        </Box>
        <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 800, color: '#0B0F1A' }}>Loan Request</Typography>
      </Box>

      <Box className="scroll-content" sx={{ flex: 1 }}>
        <Box sx={{ px: 3, py: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Header card */}
          <Box sx={{ bgcolor: '#fff', borderRadius: '14px', p: '16px 18px', border: '1px solid #EAECEF' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 42, height: 42, borderRadius: '12px', bgcolor: '#EEF1FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={d.icon} size={21} color={BLUE} />
                </Box>
                <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#0B0F1A' }}>{d.title}</Typography>
              </Box>
              <Box sx={{ bgcolor: meta.bg, borderRadius: '999px', px: '10px', py: '4px', flexShrink: 0 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: meta.color }}>{meta.label}</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: 12.5, color: '#8A94A6', mt: 1.5 }}>Ref: {d.ref} · Applied {d.date}</Typography>
          </Box>

          {/* Decision notice */}
          <Box sx={{ bgcolor: notice.bg, border: `1px solid ${notice.border}`, borderRadius: '14px', p: '14px 16px' }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: notice.titleColor, mb: '6px' }}>{d.headline}</Typography>
            <Typography sx={{ fontSize: 13, color: notice.bodyColor, lineHeight: 1.55 }}>{d.body}</Typography>
          </Box>

          {/* Why */}
          <Box sx={{ bgcolor: '#fff', border: '1px solid #EAECEF', borderRadius: '14px', overflow: 'hidden' }}>
            <Box sx={{ px: '16px', py: '10px', bgcolor: '#F5F6F8', borderBottom: '1px solid #EAECEF' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#8A94A6', letterSpacing: '0.5px' }}>{d.whyLabel}</Typography>
            </Box>
            <Box sx={{ px: '16px', py: '14px' }}>
              <Typography sx={{ fontSize: 13.5, color: '#0B0F1A', lineHeight: 1.6 }}>{d.why}</Typography>
            </Box>
          </Box>

          {/* What you can do */}
          <Box sx={{ bgcolor: '#fff', border: '1px solid #EAECEF', borderRadius: '14px', p: '16px' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0B0F1A', mb: '12px' }}>What you can do</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {d.actions.map((a) => (
                <Box key={a} sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: '1px' }}>
                    <Icon name="check" size={11} color="#16A34A" />
                  </Box>
                  <Typography sx={{ fontSize: 13.5, color: '#374151', lineHeight: 1.55 }}>{a}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: '40px', bgcolor: '#F5F6F8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button variant="contained" fullWidth onClick={() => navigate('/products')} sx={{ height: 52, borderRadius: '14px', fontSize: 15, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}>
          {d.ctaLabel}
        </Button>
        <Button variant="text" fullWidth onClick={() => navigate(-1)} sx={{ height: 44, fontSize: 14, fontWeight: 700, color: BLUE }}>
          Back to Requests
        </Button>
      </Box>
    </Box>
  )
}
