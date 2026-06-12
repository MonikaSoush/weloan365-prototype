import { createTheme } from '@mui/material/styles'

// =============================================
// WeLoan365 Design Tokens
// Primary:     #275CB2
// Heading:     #0B0F1A
// Text 1:      #1A1A1A
// Text 2:      #666666
// Text 3:      #999999
// Background:  #F5F5F5
// Surface:     #FFFFFF
// Border:      #E0E0E0
// Grid:        4px
// Button h:    48px
// Radius:      8px
// =============================================

export const TOKENS = {
  primary: '#275CB2',
  primaryLight: '#3D74C9',
  primaryDark: '#1F4F9E',
  primarySurface: '#EAF1FC',

  heading: '#0B0F1A',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textDisabled: '#999999',

  background: '#F5F5F5',
  surface: '#FFFFFF',
  border: '#E0E0E0',

  success: '#1E8A44',
  warning: '#FF8B00',
  error: '#D73A2C',

  buttonHeight: 48,
  radius: 8,
  spacing: 4,
} as const

export const theme = createTheme({
  palette: {
    primary: {
      main: TOKENS.primary,
      light: TOKENS.primaryLight,
      dark: TOKENS.primaryDark,
      contrastText: '#FFFFFF',
    },
    background: {
      default: TOKENS.background,
      paper: TOKENS.surface,
    },
    text: {
      primary: TOKENS.textPrimary,
      secondary: TOKENS.textSecondary,
      disabled: TOKENS.textDisabled,
    },
    divider: TOKENS.border,
    success: { main: TOKENS.success },
    warning: { main: TOKENS.warning },
    error: { main: TOKENS.error },
  },

  typography: {
    fontFamily: `'Inter', 'Noto Sans Khmer', -apple-system, BlinkMacSystemFont, sans-serif`,
    h1: {
      fontSize: '24px',
      fontWeight: 800,
      letterSpacing: '-0.5px',
      color: TOKENS.heading,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '20px',
      fontWeight: 700,
      letterSpacing: '-0.3px',
      color: TOKENS.heading,
      lineHeight: 1.35,
    },
    h3: {
      fontSize: '17px',
      fontWeight: 700,
      color: TOKENS.heading,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '14px',
      lineHeight: 1.65,
      color: TOKENS.textPrimary,
    },
    body2: {
      fontSize: '13px',
      lineHeight: 1.55,
      color: TOKENS.textSecondary,
    },
    caption: {
      fontSize: '11px',
      lineHeight: 1.5,
      color: TOKENS.textDisabled,
    },
    button: {
      fontFamily: `'Inter', 'Noto Sans Khmer', sans-serif`,
      fontWeight: 700,
      letterSpacing: '0.1px',
    },
  },

  shape: {
    borderRadius: TOKENS.radius,
  },

  spacing: TOKENS.spacing,

  components: {
    // ─── Button ───────────────────────────────
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          height: TOKENS.buttonHeight,
          borderRadius: TOKENS.radius,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '15px',
          minWidth: 0,
        },
        // Primary CTA buttons use the deeper brand blue #275CB2.
        containedPrimary: {
          backgroundColor: '#275CB2',
          '&:hover': { backgroundColor: '#1F4F9E' },
        },
        sizeLarge: {
          height: 52,
          fontSize: '16px',
        },
        sizeSmall: {
          height: 36,
          fontSize: '13px',
          padding: '0 12px',
        },
      },
    },

    // ─── TextField ───────────────────────────
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: TOKENS.buttonHeight,
            borderRadius: TOKENS.radius,
            fontSize: '14px',
            backgroundColor: TOKENS.surface,
            '& fieldset': { borderColor: TOKENS.border },
            '&:hover fieldset': { borderColor: '#BDBDBD' },
            '&.Mui-focused fieldset': { borderColor: TOKENS.primary },
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
          },
        },
      },
    },

    // ─── Paper / Card ────────────────────────
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: TOKENS.radius,
          border: `1px solid ${TOKENS.border}`,
        },
      },
    },

    // ─── Bottom Navigation ───────────────────
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 64,
          borderTop: `1px solid ${TOKENS.border}`,
          backgroundColor: TOKENS.surface,
        },
      },
    },

    // ─── Input Base ───────────────────────────
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': { color: TOKENS.textDisabled, opacity: 1 },
        },
      },
    },
  },
})
