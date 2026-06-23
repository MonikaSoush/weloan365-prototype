import { Fragment, ReactNode, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import { Icon, type IconName } from '../components/Icon'
import { Flag } from '../components/Flag'
import { AssetImg, BANNERS } from '../components/home/media'
import { useFlow } from '../workspace/FlowContext'
import { BottomSheet } from './mwl/MwlParts'
import CallSheet from '../components/CallSheet'

// ─────────────────────────────────────────────────────────────────────────────
// Product (loan) detail — opened by tapping a loan card on the Products screen.
// Mirrors the Figma "Product detail" frame (node 1213:9421).
// ─────────────────────────────────────────────────────────────────────────────
const LABEL = '#737373'
const VALUE = '#171717'
const BRAND = '#275CB2'

// Map a product name → its hero banner. Uses the same Sample-1 assets shown on
// the Products tab so the detail hero matches the card thumbnail.
const HERO_BY_NAME: Record<string, string> = {
  'SME Loan': BANNERS.smeS1,
  'Micro Loan': BANNERS.microS1,
  'Small Biz Loan': BANNERS.smallS1,
  'Housing Loan': BANNERS.housingS1,
  'Migration Worker Loan': BANNERS.mwlS1,
  'Staff Loan': BANNERS.staffLoan,
}

const USES = [
  'Daily business expenses',
  'Farming inputs & equipment',
  'Stock & inventory purchases',
  'Small repairs and upgrades',
]

const KEY_FEATURES: [string, string][] = [
  ['Loan size', 'Up to $100,000'],
  ['Interest', '1.2% (negotiable)'],
  ['Loan term', 'Up to 120 months'],
  ['Repayment', 'Periodic principal + interest'],
]

// Staff Loan has its own headline terms.
const STAFF_FEATURES: [string, string][] = [
  ['Loan size', 'Up to 2× salary'],
  ['Interest', '1.0%'],
  ['Repayment', 'Constant'],
]

// Migration Worker Loan — full key-features list (ordered).
const MWL_FEATURES: [string, string][] = [
  ['Loan size', 'Up to $15,000'],
  ['Interest Rate', 'From 0.98% / month'],
  ['Loan term', 'Up to 36 months'],
  ['Loan Fee', '3.00% of approved amount'],
  ['CBC Fee', 'USD 10.00 (non-refundable)'],
  ['Purpose', 'Overseas employment-related expenses'],
  ['Repayment', 'Periodic principal + interest'],
]

// Migration Worker Loan is unsecured — no collateral required.
const MWL_ELIGIBILITY: [string, string][] = [
  ['Age', '18 – 65 years old'],
  ['Residence', 'Permanent address in NH MFI operating area'],
  ['Income', 'Stable, verifiable source'],
  ['Collateral', 'Not required'],
]

const MWL_USES = [
  'Visa application & processing fees',
  'Flight tickets & travel costs',
  'Medical checkup & agency fees',
  'Pre-departure training & equipment',
]

const MWL_STORY_FEATURES = [
  { emoji: '✈️', title: 'Before you fly', desc: 'Cover visa, flights, medical checks and agency fees — no collateral needed.' },
  { emoji: '💰', title: 'While you work', desc: 'Repay gradually from your overseas salary, on a schedule built around your contract.' },
  { emoji: '🏠', title: 'Family at home', desc: 'Keep loved ones supported the whole time you are away.' },
]

const MWL_DESTINATIONS = [
  { flag: 'kr' as const, name: 'Korea', sub: 'EPS · most active' },
  { flag: 'jp' as const, name: 'Japan', sub: 'SSW / Intern' },
  { flag: 'sg' as const, name: 'Singapore', sub: 'Work Permit' },
]

const ELIGIBILITY: [string, string][] = [
  ['Age', '18 – 65 years old'],
  ['Residence', 'Permanent address in NH MFI operating area'],
  ['Income', 'Stable, verifiable source'],
  ['Collateral', 'Hard or soft title'],
]

const DOCUMENTS = [
  'Business Documents',
  'Financial information',
  'Collateral documents',
  'Owner identification',
]

const MWL_DOCUMENTS = [
  'Personal Identification',
  'Employment Contract',
  'Medical Certificate',
  'Agency Agreement',
]

// Per-document preview content shown in the bottom sheet.
type DocDetail = { icon: IconName; blurb: string; items: string[]; formats: string }
const DOC_DETAILS: Record<string, DocDetail> = {
  'Business Documents': {
    icon: 'briefcase',
    blurb: 'Proof that your business is registered and operating.',
    items: [
      'Business registration / patent certificate',
      'Trade licence or commercial permit',
      'Tax registration (VAT/TIN) if available',
      'Business premises lease or ownership proof',
    ],
    formats: 'Originals to verify · clear photo or scan to upload',
  },
  'Financial information': {
    icon: 'banknote',
    blurb: 'Records that show your income and repayment capacity.',
    items: [
      'Bank statements — last 6 months',
      'Sales / revenue records or invoices',
      'Existing loan or debt statements',
      'Profit & loss summary if available',
    ],
    formats: 'PDF or photo · last 6 months required',
  },
  'Collateral documents': {
    icon: 'home',
    blurb: 'Ownership proof for the asset offered as security.',
    items: [
      'Hard or soft land/property title',
      'Vehicle registration card (if applicable)',
      'Recent property valuation if available',
      'Proof there are no existing liens',
    ],
    formats: 'Originals required at the branch for verification',
  },
  'Owner identification': {
    icon: 'idCard',
    blurb: 'Identity documents for the business owner and guarantor.',
    items: [
      'National ID card or valid passport',
      'Family book or residence certificate',
      'Recent passport-size photo',
      "Guarantor's ID (if a guarantor is required)",
    ],
    formats: 'Originals to verify · must be valid and unexpired',
  },
}
const MWL_DOC_DETAILS: Record<string, DocDetail> = {
  'Personal Identification': {
    icon: 'idCard',
    blurb: 'Valid identity documents for the applicant.',
    items: [
      'National ID card or valid passport',
      'Family book or residence certificate',
      'Recent passport-size photo',
      'Birth certificate (if required)',
    ],
    formats: 'Originals to verify · must be valid and unexpired',
  },
  'Employment Contract': {
    icon: 'briefcase',
    blurb: 'Proof of overseas employment or job offer.',
    items: [
      'Signed employment contract or offer letter',
      'Work permit or visa approval letter',
      'Employer contact details and address',
      'Contract duration and salary details',
    ],
    formats: 'Originals preferred · certified translation if not in English/Khmer',
  },
  'Medical Certificate': {
    icon: 'appPolicy',
    blurb: 'Medical fitness certificate required for overseas work.',
    items: [
      'Medical examination certificate from approved clinic',
      'Health clearance from destination country (if required)',
      'Vaccination records (if applicable)',
    ],
    formats: 'Original certificate · issued within 3 months',
  },
  'Agency Agreement': {
    icon: 'banknote',
    blurb: 'Agreement with the licensed recruitment agency.',
    items: [
      'Signed recruitment agency agreement',
      'Agency licence and registration number',
      'Fee schedule and service breakdown',
      'Contact details of agency representative',
    ],
    formats: 'Original or certified copy',
  },
}

const DOC_FALLBACK: DocDetail = {
  icon: 'appPolicy',
  blurb: 'Documents required to support your loan application.',
  items: ['Please contact your branch for the full document list.'],
  formats: 'Originals to verify · photo or scan to upload',
}

export default function ProductDetailScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { flow } = useFlow()
  const name = params.get('p') ?? 'SME Loan'
  const hero = HERO_BY_NAME[name] ?? BANNERS.smeS1
  const isStaff = name === 'Staff Loan'
  const isMwl = name === 'Migration Worker Loan'
  const features = isStaff ? STAFF_FEATURES : isMwl ? MWL_FEATURES : KEY_FEATURES
  const eligibility = isMwl ? MWL_ELIGIBILITY : ELIGIBILITY
  // Apply flow per product: Migration Worker Loan → MWL (multi-step); Staff Loan
  // → the single-screen staff form; everything else → the Non-MWL flow.
  const applyPath =
    name === 'Migration Worker Loan'
      ? '/mwl-about'
      : name === 'Staff Loan'
        ? '/staff-loan'
        : '/nonmwl-about?product=' + encodeURIComponent(name)
  // Visitors must sign up first; the apply destination is carried via `?next=`
  // so they land on the application after completing sign-up.
  const onApply = () => {
    if (isMwl) {
      navigate(flow === 'Visitor' ? '/sign-up?next=' + encodeURIComponent(applyPath) : applyPath)
    } else if (isStaff) {
      setStaffSheetOpen(true)
    } else {
      navigate(flow === 'Visitor' ? '/sign-up?next=' + encodeURIComponent(applyPath) : applyPath)
    }
  }

  // Compact header fades in once the hero image has scrolled mostly out of view.
  const [scrolled, setScrolled] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  // Required-documents preview: holds the doc name whose sheet is open.
  const [previewDoc, setPreviewDoc] = useState<string | null>(null)
  // Staff verification sheet
  const [staffSheetOpen, setStaffSheetOpen] = useState(false)

  // Chat opens the support conversation (visitors sign up first).
  const onChat = () =>
    navigate(flow === 'Visitor' ? '/sign-up?next=' + encodeURIComponent('/chat') : '/chat')

  return (
    <Box className="screen-enter" sx={{ position: 'relative', height: 'calc(100% + 34px)', mt: '-34px', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>

      {/* ── Compact sticky header (appears on scroll) ─────────────────── */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          height: 60,
          px: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #ECECEC',
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
      >
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: '#171717' }}>
          <Icon name="chevronLeft" size={24} color="#171717" />
        </IconButton>
        <Typography sx={{ flex: 1, fontSize: 18, fontWeight: 800, color: '#171717', letterSpacing: '-0.3px' }} noWrap>
          {name}
        </Typography>
        <IconButton onClick={onChat} aria-label="Chat" sx={{ color: '#171717' }}>
          <Icon name="message" size={22} color="#171717" />
        </IconButton>
        <IconButton onClick={() => setCallOpen(true)} aria-label="Call" sx={{ color: '#171717' }}>
          <Icon name="phone" size={22} color="#171717" />
        </IconButton>
      </Box>

      <Box
        className="scroll-content"
        sx={{ flex: 1 }}
        onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 220)}
      >
        {/* ── Hero header ─────────────────────────────────────────────── */}
        <Box sx={{ position: 'relative', height: isMwl ? 320 : 300, overflow: 'hidden' }}>
          <AssetImg
            src={hero}
            alt={name}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            fallback={<Box sx={{ position: 'absolute', inset: 0, bgcolor: '#4279B3' }} />}
          />
          {/* bottom gradient */}
          <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: isMwl ? 180 : 120, background: 'linear-gradient(to bottom, rgba(30,58,120,0) 0%, #1E3A78 70%)' }} />

          {/* Back button */}
          <Box onClick={() => navigate(-1)} role="button" aria-label="Back" sx={{ position: 'absolute', top: 16, left: 16, width: 44, height: 44, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="chevronLeft" size={24} color="#fff" />
          </Box>

          <Box sx={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', gap: 1 }}>
            <HeroPill icon="message" label="Chat" onClick={onChat} />
            <HeroPill icon="phone" label="Call" onClick={() => setCallOpen(true)} />
          </Box>
        </Box>

        {/* ── Body ────────────────────────────────────────────────────── */}
        {isMwl ? (
          /* ── MWL body in Non-MWL section style ─────────────────────── */
          <Box sx={{ px: 3, py: '16px', display: 'flex', flexDirection: 'column', gap: '30px' }}>

            {/* What it's for */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <SectionLabel>What it's for</SectionLabel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {MWL_USES.map((u) => (
                  <Box key={u} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckBadge />
                    <Typography sx={{ fontSize: 14, color: '#525252' }}>{u}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Calculate / Request Consult */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ToolButton icon="calculator" label="Calculate" onClick={() => navigate('/calculator?product=' + encodeURIComponent('Migration Worker Loan'))} sx={{ width: 132, flexShrink: 0 }} />
              <ToolButton icon="clock" label="Request Consult" onClick={() => navigate(flow === 'Visitor' ? '/sign-up?next=' + encodeURIComponent('/request-consult') : '/request-consult')} sx={{ flex: 1 }} />
            </Box>

            {/* Key features */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <SectionLabel>Key features</SectionLabel>
              <SpecCard rows={MWL_FEATURES} />
            </Box>

            {/* Eligibility */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <SectionLabel>Eligibility</SectionLabel>
              <SpecCard rows={MWL_ELIGIBILITY} />
            </Box>

            {/* Required Documents */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <SectionLabel>Required Documents</SectionLabel>
              <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', overflow: 'hidden' }}>
                {MWL_DOCUMENTS.map((d, i) => (
                  <Box key={d} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: '14px', py: '12px', borderBottom: i < MWL_DOCUMENTS.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                    <Icon name="appPolicy" size={22} color="#171717" />
                    <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 600, color: VALUE }}>{d}</Typography>
                    <Box role="button" aria-label={`Preview ${d}`} onClick={() => setPreviewDoc(d)} sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', minHeight: 32, px: '8px', borderRadius: '8px', cursor: 'pointer', '&:active': { bgcolor: 'rgba(39,92,178,0.08)' } }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: BRAND }}>Preview</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

          </Box>
        ) : (
          /* ── Standard loan body ─────────────────────────────────────── */
          <Box sx={{ px: 3, py: '16px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* What it's for */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <SectionLabel>What it's for</SectionLabel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {USES.map((u) => (
                  <Box key={u} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckBadge />
                    <Typography sx={{ fontSize: 14, color: '#525252' }}>{u}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Calculate / Request Consult */}
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <ToolButton
                icon="calculator"
                label="Calculate"
                onClick={() =>
                  navigate(
                    '/calculator?product=' +
                      encodeURIComponent(
                        name === 'SME Loan'
                          ? 'Small & Medium Enterprise Loan'
                          : name,
                      ),
                  )
                }
                sx={{ width: 132, flexShrink: 0 }}
              />
              <ToolButton
                icon="clock"
                label="Request Consult"
                onClick={() => navigate(flow === 'Visitor' ? '/sign-up?next=' + encodeURIComponent('/request-consult') : '/request-consult')}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Spec cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <SectionLabel>Key features</SectionLabel>
                <SpecCard rows={features} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <SectionLabel>Eligibility</SectionLabel>
                <SpecCard rows={eligibility} />
              </Box>
            </Box>

            {/* Required documents — hidden for the Staff Loan */}
            {!isStaff && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <SectionLabel>Required Documents</SectionLabel>
              <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', overflow: 'hidden' }}>
                {DOCUMENTS.map((d, i) => (
                  <Box key={d} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: '14px', py: '12px', borderBottom: i < DOCUMENTS.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                    <Icon name="appPolicy" size={22} color="#171717" />
                    <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 600, color: VALUE }}>{d}</Typography>
                    <Box role="button" aria-label={`Preview ${d}`} onClick={() => setPreviewDoc(d)} sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', minHeight: 32, px: '8px', borderRadius: '8px', cursor: 'pointer', '&:active': { bgcolor: 'rgba(39,92,178,0.08)' } }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: BRAND }}>Preview</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            )}
          </Box>
        )}
      </Box>

      {/* ── Footer CTA ─────────────────────────────────────────────────── */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1, pb: '44px', bgcolor: '#F5F5F5' }}>
        <Button
          variant="contained"
          fullWidth
          endIcon={<Icon name="arrowRight" size={18} color="#fff" />}
          onClick={onApply}
          sx={{ minHeight: 48, borderRadius: '8px', fontSize: 16, fontWeight: 600, bgcolor: BRAND, '&:hover': { bgcolor: '#1F4F9E' } }}
        >
          {isMwl ? 'Start my application' : 'Apply this loan'}
        </Button>
      </Box>

      {/* ── Call sheet ─────────────────────────────────────────────────── */}
      <CallSheet open={callOpen} onClose={() => setCallOpen(false)} />

      {/* ── Required-document preview sheet ────────────────────────────── */}
      <DocPreviewSheet doc={previewDoc} onClose={() => setPreviewDoc(null)} />

      {/* ── Staff verification sheet ────────────────────────────────────── */}
      <StaffVerifySheet open={staffSheetOpen} onClose={() => setStaffSheetOpen(false)} />
    </Box>
  )
}

// ─── Staff ID verification sheet ─────────────────────────────────────────────
const NH_ID_RE = /^NH-\d{9}$/

const MOCK_STAFF: Record<string, { name: string; initials: string; role: string; branch: string }> = {
  'NH-000000001': { name: 'Sophea Kim',    initials: 'SK', role: 'Credit Officer',  branch: 'Riverside Branch' },
  'NH-123456789': { name: 'Dara Chann',    initials: 'DC', role: 'Senior Loan Officer', branch: 'Toul Kork Branch' },
}
const DEFAULT_STAFF = { name: 'Sophea Kim', initials: 'SK', role: 'Credit Officer', branch: 'Riverside Branch' }

type StaffProfile = { name: string; initials: string; role: string; branch: string }

function StaffVerifySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [staffId, setStaffId] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<StaffProfile | null>(null)
  const [error, setError] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isValidFormat = NH_ID_RE.test(staffId)

  const handleClose = () => {
    setStaffId('')
    setLoading(false)
    setProfile(null)
    setError('')
    onClose()
  }

  const handleVerify = () => {
    if (!isValidFormat) { setError('Enter a valid Staff ID (e.g. NH-000000000)'); return }
    setError('')
    setLoading(true)
    timerRef.current = setTimeout(() => {
      setLoading(false)
      setProfile(MOCK_STAFF[staffId] ?? DEFAULT_STAFF)
    }, 1600)
  }

  const handleSubmit = () => {
    handleClose()
    navigate('/staff-loan')
  }

  return (
    <BottomSheet open={open} onClose={handleClose}>
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.3px' }}>
          Are you an NH Staff?
        </Typography>
        <IconButton size="small" onClick={handleClose} sx={{ color: '#9AA3B2' }}>
          <Icon name="close" size={20} color="#9AA3B2" />
        </IconButton>
      </Box>
      <Typography sx={{ fontSize: 14, color: '#6B7280', mb: 2 }}>
        Enter your Staff ID to verify and access the Staff Loan application.
      </Typography>

      {/* Staff ID input */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Box
            component="input"
            value={staffId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStaffId(e.target.value.toUpperCase())
              setProfile(null)
              setError('')
            }}
            placeholder="NH-000000000"
            disabled={loading || !!profile}
            sx={{
              width: '100%',
              height: 48,
              border: error ? '1.5px solid #E53935' : profile ? '1.5px solid #1FA85C' : '1.5px solid #D1D5DB',
              borderRadius: '10px',
              px: '14px',
              fontSize: 15,
              fontWeight: 600,
              color: '#0B0F1A',
              outline: 'none',
              bgcolor: profile ? '#F0FBF4' : '#fff',
              fontFamily: 'inherit',
              letterSpacing: '0.5px',
              '&:focus': { borderColor: profile ? '#1FA85C' : '#275CB2' },
              '&:disabled': { bgcolor: '#F5F5F5', color: '#9AA3B2' },
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <Typography sx={{ fontSize: 12, color: '#E53935', mt: 0.5 }}>{error}</Typography>
          )}
          {!error && !profile && (
            <Typography sx={{ fontSize: 12, color: '#9AA3B2', mt: 0.5 }}>Format: NH-000000000</Typography>
          )}
        </Box>
        {!profile && (
          <Button
            variant="contained"
            onClick={handleVerify}
            disabled={loading || staffId.length < 3}
            sx={{
              height: 48,
              px: 2.5,
              borderRadius: '10px',
              fontSize: 14,
              fontWeight: 700,
              bgcolor: BRAND,
              '&:hover': { bgcolor: '#1F4F9E' },
              flexShrink: 0,
              minWidth: 90,
            }}
          >
            {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Verify'}
          </Button>
        )}
      </Box>

      {/* Loading state */}
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#F0F4FF', borderRadius: '10px', px: 2, py: 1.5, mt: 1 }}>
          <CircularProgress size={16} sx={{ color: BRAND }} />
          <Typography sx={{ fontSize: 13, color: BRAND, fontWeight: 600 }}>Verifying Staff ID…</Typography>
        </Box>
      )}

      {/* Matched staff profile */}
      {profile && (
        <Box
          sx={{
            bgcolor: '#fff',
            border: '1.5px solid #1FA85C',
            borderRadius: '14px',
            p: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mt: 1,
            animation: 'staffPop 0.22s cubic-bezier(0.32,0.72,0,1)',
            '@keyframes staffPop': { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
          }}
        >
          <Box sx={{ width: 46, height: 46, borderRadius: '50%', bgcolor: '#E7F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: BRAND }}>{profile.initials}</Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0B0F1A' }}>{profile.name}</Typography>
              <Box sx={{ bgcolor: '#DCF5E6', borderRadius: '999px', px: '7px', py: '1px' }}>
                <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#1FA85C' }}>Verified ✓</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: 12.5, color: '#6B7280', mt: 0.25 }}>{profile.role} · {profile.branch}</Typography>
            <Typography sx={{ fontSize: 11.5, color: '#9AA3B2', mt: 0.25, fontFamily: 'monospace', letterSpacing: '0.3px' }}>{staffId}</Typography>
          </Box>
        </Box>
      )}

      {/* Submit CTA — shown once verified */}
      {profile && (
        <Button
          variant="contained"
          fullWidth
          endIcon={<Icon name="arrowRight" size={18} color="#fff" />}
          onClick={handleSubmit}
          sx={{
            height: 52,
            borderRadius: '12px',
            fontSize: 15,
            fontWeight: 700,
            bgcolor: BRAND,
            '&:hover': { bgcolor: '#1F4F9E' },
            mt: 1,
          }}
        >
          Continue to Staff Loan Application
        </Button>
      )}
    </BottomSheet>
  )
}

// ─── Call sheet — shows the hotline; tapping the number places the call ──────
// ─── Document preview sheet — opened from a Required Documents "Preview" link ─
// Bottom sheet (same pattern as the apply-loan sample sheet) that shows what a
// document category contains: a sample-page mockup, the items to bring and the
// accepted formats.
function DocPreviewSheet({ doc, onClose }: { doc: string | null; onClose: () => void }) {
  const detail = (doc && (DOC_DETAILS[doc] ?? MWL_DOC_DETAILS[doc])) || DOC_FALLBACK
  return (
    <BottomSheet open={doc !== null} onClose={onClose}>
      <Typography sx={{ fontSize: 24, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.4px' }}>
        {doc ?? 'Document'}
      </Typography>

      {/* Sample document mockup */}
      <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '16px', py: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.25 }}>
        <SamplePage icon={detail.icon} title={doc ?? 'Document'} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Icon name="info" size={15} color={LABEL} />
          <Typography sx={{ fontSize: 12.5, color: LABEL }}>Sample preview · for reference only</Typography>
        </Box>
      </Box>

      {/* Close */}
      <Button
        variant="contained"
        fullWidth
        onClick={onClose}
        sx={{ height: 48, borderRadius: '12px', fontSize: 15, fontWeight: 700, bgcolor: BRAND, '&:hover': { bgcolor: '#1F4F9E' } }}
      >
        Got it
      </Button>
    </BottomSheet>
  )
}

// A stylised "document page" placeholder: an icon header over faux text lines.
function SamplePage({ icon, title }: { icon: IconName; title: string }) {
  return (
    <Box
      sx={{
        width: 168,
        aspectRatio: '3 / 4',
        bgcolor: '#fff',
        border: '1px solid #E6EBF2',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(11,15,26,0.08)',
        px: 2,
        pt: 2.25,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'rgba(39,92,178,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={24} color={BRAND} />
        </Box>
      </Box>
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#0B0F1A', textAlign: 'center', lineHeight: 1.3 }} noWrap>
        {title}
      </Typography>
      {[0.92, 0.78, 0.86, 0.64, 0.8, 0.7].map((w, i) => (
        <Box key={i} sx={{ height: 6, borderRadius: '3px', bgcolor: '#E6EBF2', width: `${w * 100}%` }} />
      ))}
    </Box>
  )
}

function HeroPill({ icon, label, onClick }: { icon: 'message' | 'phone'; label: string; onClick?: () => void }) {
  return (
    <Box
      role="button"
      onClick={onClick}
      sx={{
        height: 52,
        px: '16px',
        borderRadius: '8px',
        bgcolor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        cursor: 'pointer',
      }}
    >
      <Icon name={icon} size={22} color="#fff" />
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{label}</Typography>
    </Box>
  )
}

function ToolButton({
  icon,
  label,
  onClick,
  sx,
}: {
  icon: 'calculator' | 'clock'
  label: string
  onClick?: () => void
  sx?: object
}) {
  return (
    <Box
      onClick={onClick}
      role="button"
      sx={{
        minHeight: 40,
        bgcolor: '#fff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75,
        cursor: 'pointer',
        ...sx,
      }}
    >
      <Icon name={icon} size={16} color="#171717" />
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: VALUE }}>{label}</Typography>
    </Box>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.88px', color: LABEL, textTransform: 'uppercase' }}>
      {children}
    </Typography>
  )
}

function CheckBadge() {
  return (
    <Box
      sx={{
        width: 18,
        height: 18,
        borderRadius: '9px',
        bgcolor: '#EBF6EC',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box component="svg" viewBox="0 0 12 12" sx={{ width: 10, height: 10 }}>
        <path d="M2 6.4 L4.7 9 L10 3" fill="none" stroke="#16A34A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </Box>
    </Box>
  )
}

function SpecCard({ rows }: { rows: [string, string][] }) {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', px: '13px' }}>
      {rows.map(([k, v], i) => (
        <Box
          key={k}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            py: '14px',
            borderTop: i > 0 ? '1px solid #F5F5F5' : 'none',
          }}
        >
          <Typography sx={{ fontSize: 14, color: LABEL, flexShrink: 0 }}>{k}</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: VALUE, textAlign: 'right' }}>{v}</Typography>
        </Box>
      ))}
    </Box>
  )
}
