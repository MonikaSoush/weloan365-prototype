import { Fragment, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '../../components/Icon'
import { Flag, type FlagCode } from '../../components/Flag'
import { AssetImg, asset } from '../../components/home/media'
import { MwlHeader, MwlTitle, FieldCard, SelectField, PhoneField, BottomSheet, DiscardSheet, BLUE } from './MwlParts'
import { type Currency } from '../loanCalc'

// ─────────────────────────────────────────────────────────────────────────────
// Migration Worker Loan — 4-step application wizard.
//   1 Your Loan · 2 About You · 3 Guarantor · 4 Confirm
// Self-contained: holds all form state and steps through internally.
// ─────────────────────────────────────────────────────────────────────────────
const GREEN = '#1FA85C'
const MUTED = '#8A94A6'

const DESTINATIONS: { name: string; flag: FlagCode; long: string; code: string }[] = [
  { name: 'Korea', flag: 'kr', long: 'South Korea', code: 'KR' },
  { name: 'Japan', flag: 'jp', long: 'Japan', code: 'JP' },
  { name: 'Singapore', flag: 'sg', long: 'Singapore', code: 'SG' },
]
const BRANCHES = ['Khan Toul Kork Branch', 'Phnom Penh Main', 'Chroy Changvar', 'Siem Reap', 'Battambang']
const CURRENCIES = ['USD — US Dollar', 'KHR — Riel']
const STATUSES = ['Single', 'Married', 'Widow / Widower']
const RELATIONSHIPS = ['Spouse (1st)', 'Parent', 'Sibling', 'Relative', 'Friend']
const MONTHLY_RATE = 0.015 // 1.5% / month

const GUARANTOR_STEPS = [
  { title: 'Open SMS Link', desc: 'They receive a secure link by SMS.' },
  { title: 'Review Loan', desc: 'They review your loan details and terms.' },
  { title: 'Confirm as Guarantor', desc: 'They confirm to back your application.' },
]

export default function MwlApplyScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [discardOpen, setDiscardOpen] = useState(false)
  const [sheet, setSheet] = useState<{ title: string; img?: string } | null>(null)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  // Documents start un-uploaded; the user taps to upload each.
  const [docs, setDocs] = useState<Record<string, boolean>>({})
  const upload = (key: string) => setDocs((d) => ({ ...d, [key]: true }))

  // Step 1 — Your Loan
  const [dest, setDest] = useState('Korea')
  const [branch, setBranch] = useState('Khan Toul Kork Branch')
  const [currency, setCurrency] = useState('USD — US Dollar')
  const [amount, setAmount] = useState('2,000')
  const [tenure, setTenure] = useState('12 months')
  const [interestOnly, setInterestOnly] = useState('3 months')
  // Step 2 — About You
  const [lastName, setLastName] = useState('Sok')
  const [firstName, setFirstName] = useState('Vanna')
  const [status, setStatus] = useState('Married')
  const [phoneCode, setPhoneCode] = useState('+855')
  const [phone, setPhone] = useState('96 234 5678')
  // Step 3 — Guarantor
  const [gLastName, setGLastName] = useState('Chan')
  const [gFirstName, setGFirstName] = useState('Dara')
  const [relationship, setRelationship] = useState('Spouse (1st)')
  const [gPhoneCode, setGPhoneCode] = useState('+855')
  const [gPhone, setGPhone] = useState('12 345 678')

  const sym = currency.startsWith('KHR') ? '៛' : '$'
  const curCode = currency.startsWith('KHR') ? 'KHR' : 'USD'
  const principal = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0
  const interestOnlyPay = principal * MONTHLY_RATE
  // After the interest-only period, principal is spread over the remaining months.
  const tenureMonths = parseInt(tenure, 10) || 0
  const graceMonths = parseInt(interestOnly, 10) || 0
  const regularMonths = Math.max(1, tenureMonths - graceMonths)
  const principalPerMonth = principal / regularMonths
  const regularPay = principalPerMonth + interestOnlyPay
  const destObj = DESTINATIONS.find((d) => d.name === dest)
  const cur = (curCode === 'KHR' ? 'KHR' : 'USD') as Currency

  // Flat-interest schedule: interest each month, principal repaid after the grace period.
  const schedule = Array.from({ length: tenureMonths }, (_, i) => {
    const m = i + 1
    const inGrace = m <= graceMonths
    const prin = inGrace ? 0 : principalPerMonth
    return { m, inGrace, prin, interest: interestOnlyPay, payment: prin + interestOnlyPay }
  })
  const fmt = (v: number) => `${cur === 'KHR' ? '៛' : '$'}${Math.round(v).toLocaleString('en-US')}`
  const totalInterest = interestOnlyPay * tenureMonths
  const totalRepayment = principal + totalInterest

  const back = () => (step > 1 ? setStep(step - 1) : setDiscardOpen(true))
  const next = () => (step < 4 ? setStep(step + 1) : navigate('/mwl-success'))

  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      {/* Step body — old-style header (Step X/4 bar) + title */}
      <Box className="scroll-content" sx={{ flex: 1 }}>
        <MwlHeader onBack={back} step={step} totalSteps={4} />
        <MwlTitle>{step === 1 ? 'Your Loan' : step === 2 ? 'About You' : step === 3 ? 'Your Guarantor' : 'Confirm'}</MwlTitle>
        <Box sx={{ px: 3, pt: 2, pb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {step === 1 && (
            <>
              {/* Destination — old-style flag tiles */}
              <Box>
                <SubLabel>Where are you heading?</SubLabel>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5 }}>
                  {DESTINATIONS.map((d) => {
                    const active = dest === d.name
                    return (
                      <Box key={d.name} onClick={() => setDest(d.name)} role="button"
                        sx={{ position: 'relative', bgcolor: '#fff', borderRadius: '14px', border: active ? `2px solid ${BLUE}` : '2px solid #E2E6EC', p: 1.5, cursor: 'pointer', transition: 'border-color 0.15s' }}>
                        {active && (
                          <Box sx={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: '50%', bgcolor: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="check" size={13} color="#fff" />
                          </Box>
                        )}
                        <Flag code={d.flag} size={32} rect />
                        <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#0B0F1A', mt: 0.75 }}>{d.name}</Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
              <SelectField label="Nearest Branch" required options={BRANCHES} value={branch} onChange={setBranch} />
              <SelectField label="Currency" required options={CURRENCIES} value={currency} onChange={setCurrency} />
              <FieldCard label="Loan Amount" required value={amount} onChange={setAmount}
                trailing={<Typography sx={{ fontSize: 16, fontWeight: 700, color: MUTED }}>{sym}</Typography>} />
              <SelectField label="Loan term" required options={['12 months', '24 months', '36 months']} value={tenure} onChange={setTenure} />
              <SelectField label="Interest Only Payment" required options={['3 months', '6 months']} value={interestOnly} onChange={setInterestOnly} />
              {/* Estimated monthly payment — full breakdown */}
              <Box sx={{ bgcolor: '#fff', borderRadius: '14px', border: `1px solid ${BLUE}33`, p: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontSize: 12.5, color: MUTED }}>Estimated monthly payment</Typography>
                  <Box role="button" onClick={() => setScheduleOpen(true)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                    <Icon name="eye" size={16} color={BLUE} />
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: BLUE }}>View schedule</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>Interest Only</Typography>
                  <Typography sx={{ fontSize: 18, fontWeight: 800, color: BLUE }}>{curCode} {Math.round(interestOnlyPay)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>Regular Repayment</Typography>
                  <Typography sx={{ fontSize: 18, fontWeight: 800, color: BLUE }}>{curCode} {Math.round(regularPay)}</Typography>
                </Box>
                <Typography sx={{ fontSize: 11.5, color: MUTED, mt: 0.75 }}>ⓘ Final rate, tenure, &amp; terms are subject to credit approval.</Typography>
              </Box>
            </>
          )}

          {step === 2 && (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <FieldCard label="Last Name" required value={lastName} onChange={setLastName} />
                <FieldCard label="First Name" required value={firstName} onChange={setFirstName} />
              </Box>
              <SelectField label="Marital Status" required options={STATUSES} value={status} onChange={setStatus} />
              <PhoneField label="Phone Number" code={phoneCode} number={phone} onCodeChange={setPhoneCode} onNumberChange={setPhone} />
              <Box sx={{ mt: 1 }}>
                <SubLabel>Upload ID &amp; Family Book</SubLabel>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <DocRow label="National ID — Front" img={asset('banners/NID.png')} uploaded={!!docs.nid} onUpload={() => upload('nid')} onView={() => setSheet({ title: 'National ID — Front', img: asset('banners/NID.png') })} />
                  <DocRow label="Family / Residential Book" img={asset('banners/FamBook.png')} uploaded={!!docs.family} onUpload={() => upload('family')} onView={() => setSheet({ title: 'Family / Residential Book', img: asset('banners/FamBook.png') })} />
                </Box>
              </Box>
            </>
          )}

          {step === 3 && (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <FieldCard label="Last Name" required value={gLastName} onChange={setGLastName} />
                <FieldCard label="First Name" required value={gFirstName} onChange={setGFirstName} />
              </Box>
              <SelectField label="Relationship" required options={RELATIONSHIPS} value={relationship} onChange={setRelationship} />
              <PhoneField label="Phone Number" code={gPhoneCode} number={gPhone} onCodeChange={setGPhoneCode} onNumberChange={setGPhone} />
              <Box sx={{ mt: 1 }}>
                <SubLabel>Guarantor's National ID</SubLabel>
                <DocRow label="Upload Photo" img={asset('banners/NID.png')} uploaded={!!docs.guarantor} onUpload={() => upload('guarantor')} onView={() => setSheet({ title: "Guarantor's National ID", img: asset('banners/NID.png') })} />
              </Box>
              <Box sx={{ mt: 1 }}>
                <SubLabel>What Your Guarantor Will Do</SubLabel>
                <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '14px', p: '18px' }}>
                  {GUARANTOR_STEPS.map((s, i, arr) => {
                    const last = i === arr.length - 1
                    return (
                      <Box key={s.title} sx={{ display: 'flex', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: '#FBEBC6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#B7791F' }}>{i + 1}</Typography>
                          </Box>
                          {!last && <Box sx={{ width: 2, flex: 1, minHeight: 16, bgcolor: '#EFE3C8', my: '4px' }} />}
                        </Box>
                        <Box sx={{ pb: last ? 0 : 1.75, minWidth: 0 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A', lineHeight: 1.2 }}>{s.title}</Typography>
                          <Typography sx={{ fontSize: 12.5, color: '#8A94A6', mt: 0.25, lineHeight: 1.4 }}>{s.desc}</Typography>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
                <Typography sx={{ fontSize: 12.5, color: BLUE, mt: 1, px: 0.5 }}>They'll get an SMS link after you submit.</Typography>
              </Box>
            </>
          )}

          {step === 4 && (
            <>
              <Box>
                <SubLabel>Review Summary</SubLabel>
                <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '14px', px: '16px' }}>
                  <SummaryRow label="Destination" value={<Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}><Flag code={destObj?.flag ?? 'kr'} size={18} rect /> {destObj?.long}</Box>} first />
                  <SummaryRow label="Currency" value={curCode} />
                  <SummaryRow label="Loan Request" value={`${curCode} ${amount}`} />
                  <SummaryRow label="Borrower" value={`${lastName} ${firstName}`} />
                  <SummaryRow label="Marital Status" value={status} />
                  <SummaryRow label="Phone" value={`${phoneCode} ${phone}`} />
                  <SummaryRow label="Branch" value={branch} />
                  <SummaryRow label="Documents" value={<Box component="span" sx={{ color: GREEN, fontWeight: 700 }}>Uploaded</Box>} />
                  <SummaryRow label="Guarantor" value={`${gLastName} ${gFirstName}`} />
                  <SummaryRow label="Relationship" value={relationship} />
                </Box>
              </Box>
              <Box>
                <SubLabel>Indicative Terms</SubLabel>
                <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '14px', px: '16px' }}>
                  <SummaryRow label="Interest Rate" value="1.50% / month" first />
                  <SummaryRow label="Tenure" value={tenure} />
                  <SummaryRow label="Interest-only" value={interestOnly} />
                  <SummaryRow label="Est. interest-only" value={`${curCode} ${Math.round(interestOnlyPay)} / mo`} />
                </Box>
                <Typography sx={{ fontSize: 11.5, color: MUTED, mt: 1, px: 0.5 }}>Indicative only · final terms confirmed at credit assessment.</Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 2, pb: '40px', bgcolor: '#F5F5F5' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={next}
          endIcon={step < 4 ? <Icon name="arrowRight" size={18} /> : undefined}
          sx={{
            height: 54, borderRadius: '14px', fontSize: 16, fontWeight: 700,
            bgcolor: step === 4 ? GREEN : BLUE,
            '&:hover': { bgcolor: step === 4 ? '#1A9150' : '#1F4F9E' },
          }}
        >
          {step === 4 ? 'Submit Loan Request' : 'Continue'}
        </Button>
      </Box>

      <DiscardSheet open={discardOpen} onClose={() => setDiscardOpen(false)} onDiscard={() => navigate('/products')} />

      {/* View sample / schedule sheet */}
      <BottomSheet open={sheet !== null} onClose={() => setSheet(null)} title={sheet?.title}>
        {sheet?.img ? (
          <Box sx={{ bgcolor: '#EDEDED', borderRadius: '14px', overflow: 'hidden' }}>
            <AssetImg src={sheet.img} alt={sheet.title} sx={{ width: '100%', height: 'auto', display: 'block' }}
              fallback={<Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="image" size={40} color="#B4BCC9" /></Box>} />
          </Box>
        ) : (
          <Typography sx={{ fontSize: 14, color: '#5B6473', lineHeight: 1.6 }}>
            During the interest-only period ({interestOnly}) you pay {curCode} {Math.round(interestOnlyPay)} / month.
            After that, principal + interest is spread over the remaining tenure.
          </Typography>
        )}
        <Button variant="contained" fullWidth onClick={() => setSheet(null)} sx={{ height: 50, borderRadius: '14px', fontSize: 15, fontWeight: 700 }}>
          Got it
        </Button>
      </BottomSheet>

      {/* Estimated schedule */}
      <BottomSheet open={scheduleOpen} onClose={() => setScheduleOpen(false)} title="Estimated Schedule">
        <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A', mt: -1 }}>{destObj?.long}</Typography>
        {/* Summary tiles */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[
            { icon: 'cash' as const, label: 'Loan', value: `${sym}${amount}` },
            { icon: 'calendar' as const, label: 'Tenure', value: `${tenureMonths} mo` },
            { icon: 'clock' as const, label: 'Grace', value: `${graceMonths} mo` },
          ].map((tile) => (
            <Box key={tile.label} sx={{ flex: 1, bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '12px', p: '12px 8px', textAlign: 'center' }}>
              <Icon name={tile.icon} size={18} color={BLUE} />
              <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0B0F1A', mt: 0.5 }}>{tile.value}</Typography>
              <Typography sx={{ fontSize: 11, color: MUTED }}>{tile.label}</Typography>
            </Box>
          ))}
        </Box>
        {/* Schedule table */}
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <Box component="thead">
            <Box component="tr">
              {['#', 'PRINCIPAL', 'INTEREST', 'PAYMENT'].map((h, i) => (
                <Box component="th" key={h} sx={{ width: i === 0 ? 28 : undefined, fontSize: 11, fontWeight: 700, color: i === 3 ? BLUE : MUTED, textAlign: i === 0 ? 'left' : 'right', pb: 1, borderBottom: '1px solid #EEF0F3' }}>{h}</Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {schedule.map((r) => (
              <Box component="tr" key={r.m} sx={{ borderBottom: '1px solid #F4F5F7' }}>
                <Box component="td" sx={{ py: '11px', fontSize: 13, fontWeight: 700, color: r.inGrace ? '#C47F11' : '#0B0F1A' }}>{r.m}</Box>
                <Box component="td" sx={{ py: '11px', fontSize: 13, textAlign: 'right', color: '#5B6473' }}>{r.inGrace ? '—' : fmt(r.prin)}</Box>
                <Box component="td" sx={{ py: '11px', fontSize: 13, textAlign: 'right', color: '#5B6473' }}>{fmt(r.interest)}</Box>
                <Box component="td" sx={{ py: '11px', fontSize: 13, textAlign: 'right', fontWeight: 800, color: '#0B0F1A' }}>{fmt(r.payment)}</Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Grace note */}
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#C47F11' }}>First {graceMonths} months are grace (interest only).</Typography>

        {/* Totals */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '14px', p: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 14, color: '#3A4256' }}>Total principal</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>{fmt(principal)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography sx={{ fontSize: 14, color: '#3A4256' }}>Total interest</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }}>{fmt(totalInterest)}</Typography>
          </Box>
          <Box sx={{ height: '1px', bgcolor: '#E2E6EC', my: 1.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 800, color: BLUE }}>Total repayment</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 800, color: BLUE }}>{fmt(totalRepayment)}</Typography>
          </Box>
        </Box>

        <Typography sx={{ fontSize: 11.5, color: MUTED, lineHeight: 1.5, mt: -1 }}>
          Estimate using a flat 1.5%/month illustration. Final terms confirmed by NH after assessment. Excludes the USD 10 CBC fee and upfront fee.
        </Typography>
      </BottomSheet>
    </Box>
  )
}

function SubLabel({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#3A4256', mb: 1 }}>{children}</Typography>
}

function DocRow({ label, img, uploaded, onUpload, onView }: { label: string; img: string; uploaded: boolean; onUpload: () => void; onView: () => void }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: uploaded ? '#EAF7EF' : '#fff', border: uploaded ? '1px solid #BFE6CF' : '1px dashed #CBD3DF', borderRadius: '12px', p: '10px 12px' }}>
      <Box sx={{ width: 52, height: 40, borderRadius: '8px', overflow: 'hidden', flexShrink: 0, bgcolor: '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {uploaded ? (
          <AssetImg src={img} alt={label} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} fallback={<Icon name="image" size={18} color="#B4BCC9" />} />
        ) : (
          <Icon name="camera" size={18} color="#9AA3B2" />
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0B0F1A' }} noWrap>{label}</Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: uploaded ? GREEN : '#8A94A6' }}>{uploaded ? 'Photo uploaded' : 'Required · not uploaded'}</Typography>
        <Typography role="button" onClick={onView} sx={{ fontSize: 12, fontWeight: 600, color: BLUE, cursor: 'pointer', display: 'inline-block', mt: '1px' }}>
          View sample
        </Typography>
      </Box>
      {uploaded ? (
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="check" size={14} color="#fff" />
        </Box>
      ) : (
        <Box role="button" aria-label={`Upload ${label}`} onClick={onUpload} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, bgcolor: '#EEF3FC', borderRadius: '999px', px: 1.25, py: 0.75, cursor: 'pointer', '&:active': { opacity: 0.7 } }}>
          <Icon name="camera" size={15} color={BLUE} />
          <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: BLUE }}>Upload</Typography>
        </Box>
      )}
    </Box>
  )
}

function SummaryRow({ label, value, first = false }: { label: string; value: ReactNode; first?: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: '13px', borderTop: first ? 'none' : '1px solid #F1F4F8' }}>
      <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0B0F1A', flexShrink: 0 }}>{label}</Typography>
      <Typography component="div" sx={{ fontSize: 13.5, color: '#3A4256', textAlign: 'right' }}>{value}</Typography>
    </Box>
  )
}
