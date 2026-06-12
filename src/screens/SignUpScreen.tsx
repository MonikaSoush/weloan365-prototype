import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { Icon } from '../components/Icon'
import { Flag, type FlagCode } from '../components/Flag'

const BLUE = '#275CB2'
const MUTED = '#8A94A6'
const HEADING = '#0B0F1A'

type LangId = 'en' | 'km' | 'ko'
const LANGUAGES: { id: LangId; label: string; flag: FlagCode }[] = [
  { id: 'en', label: 'English', flag: 'gb' },
  { id: 'km', label: 'ភាសាខ្មែរ', flag: 'kh' },
  { id: 'ko', label: '한국어', flag: 'kr' },
]

// Carry an optional post-signup destination (e.g. an apply-loan screen) forward.
function nextSuffix(next: string | null) {
  return next ? '?next=' + encodeURIComponent(next) : ''
}

// ─── Enter Phone Number — Visitor sign-up entry point ────────────────────────
export default function SignUpScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next')
  const [language, setLanguage] = useState<LangId>('en')
  const [langOpen, setLangOpen] = useState(false)
  const activeLang = LANGUAGES.find((l) => l.id === language) ?? LANGUAGES[0]

  return (
    <Box className="screen-enter" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      <Box className="scroll-content" sx={{ flex: 1 }}>
        {/* Header — back + language pill */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 3, pb: 1 }}>
          <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ ml: -1, color: '#0B0F1A' }}>
            <Icon name="chevronLeft" size={26} color="#0B0F1A" />
          </IconButton>
          <Box sx={{ position: 'relative' }}>
            <Box
              role="button"
              onClick={() => setLangOpen((v) => !v)}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, width: 70, height: 36, bgcolor: '#fff', borderRadius: 999, cursor: 'pointer', boxShadow: '0 1px 3px rgba(16,24,40,0.06)' }}
            >
              <Flag code={activeLang.flag} size={22} />
              <Box component="span" sx={{ display: 'inline-flex', transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>
                <Icon name="chevronDown" size={16} color="#0B0F1A" />
              </Box>
            </Box>

            {/* Inline language dropdown */}
            {langOpen && (
              <>
                {/* Click-away layer */}
                <Box onClick={() => setLangOpen(false)} sx={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    zIndex: 50,
                    width: 180,
                    bgcolor: '#fff',
                    borderRadius: '14px',
                    boxShadow: '0 8px 30px rgba(11,15,26,0.16)',
                    p: 0.75,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.25,
                  }}
                >
                  {LANGUAGES.map((lang) => {
                    const active = lang.id === language
                    return (
                      <Box
                        key={lang.id}
                        role="button"
                        onClick={() => { setLanguage(lang.id); setLangOpen(false) }}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.25,
                          minHeight: 44,
                          px: 1.25,
                          borderRadius: '10px',
                          bgcolor: active ? '#EEF3FC' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.12s',
                          '&:active': { opacity: 0.85 },
                        }}
                      >
                        <Flag code={lang.flag} size={22} />
                        <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600, color: HEADING }}>{lang.label}</Typography>
                        {active && <Icon name="checkCircle" size={18} color={BLUE} />}
                      </Box>
                    )
                  })}
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Box sx={{ px: 3, pt: 1 }}>
          <Typography sx={{ fontSize: 30, fontWeight: 800, color: '#0B0F1A', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
            Enter Phone Number
          </Typography>
          <Typography sx={{ fontSize: 15, color: MUTED, mt: 1, lineHeight: 1.4 }}>
            We'll send a verification code to your number.
          </Typography>

          {/* Country selector */}
          <Box
            role="button"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#fff', borderRadius: '14px', px: '16px', minHeight: 60, mt: 3.5, cursor: 'pointer' }}
          >
            <Flag code="kh" size={34} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 12, color: MUTED, lineHeight: 1.2 }}>Country</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A', lineHeight: 1.25 }}>Cambodia</Typography>
            </Box>
            <Icon name="chevronDown" size={20} color="#0B0F1A" />
          </Box>

          {/* Code + Phone Number */}
          <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: '14px', px: '16px', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, minWidth: 104 }}>
              <FieldLabel label="Code" />
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0B0F1A', mt: 0.25 }}>+855</Typography>
            </Box>
            <Box sx={{ bgcolor: '#fff', borderRadius: '14px', px: '16px', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: 0 }}>
              <FieldLabel label="Phone Number" />
              <Box
                component="input"
                type="tel"
                inputMode="numeric"
                autoFocus
                placeholder=""
                sx={{
                  mt: 0.25,
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  bgcolor: 'transparent',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#0B0F1A',
                  caretColor: BLUE,
                  fontFamily: 'inherit',
                  p: 0,
                }}
              />
            </Box>
          </Box>

          {/* Sign in with QR — secondary action, full-width tonal button */}
          <Box
            role="button"
            onClick={() => navigate('/qr-signin')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mt: 3,
              minHeight: 56,
              borderRadius: '14px',
              bgcolor: '#EAF1FC',
              border: `1.5px solid ${BLUE}`,
              cursor: 'pointer',
              transition: 'opacity 0.15s, background-color 0.15s',
              '&:active': { bgcolor: '#DDE9FB', opacity: 0.9 },
            }}
          >
            <Icon name="qrCode" size={22} color={BLUE} />
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: BLUE }}>Sign in with QR</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexShrink: 0, px: 3, pt: 2.5, pb: '44px', bgcolor: '#F5F5F5' }}>
        <Button variant="contained" fullWidth onClick={() => navigate('/otp' + nextSuffix(next))} sx={{ height: 56, borderRadius: '14px', fontSize: 16, fontWeight: 700 }}>
          Send code
        </Button>
      </Box>
    </Box>
  )
}

function FieldLabel({ label }: { label: string }) {
  return (
    <Typography sx={{ fontSize: 12, color: MUTED, lineHeight: 1.3 }}>
      {label}
      <Box component="span" sx={{ color: '#E5484D', ml: 0.4 }}>*</Box>
    </Typography>
  )
}
