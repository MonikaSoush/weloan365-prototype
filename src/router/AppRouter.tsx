import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// ─────────────────────────────────────────────────────────────────────────────
// Screen registry — each flow screen rendered inside the phone canvas.
// Keep route ids in sync with src/workspace/registry.ts.
// ─────────────────────────────────────────────────────────────────────────────
const HomeScreen       = lazy(() => import('../screens/HomeScreen'))
const MyLoanScreen     = lazy(() => import('../screens/MyLoanScreen'))
const MwlAboutScreen   = lazy(() => import('../screens/mwl/MwlAboutScreen'))
const MwlLoanScreen    = lazy(() => import('../screens/mwl/MwlLoanScreen'))
const MwlGuarantorScreen = lazy(() => import('../screens/mwl/MwlGuarantorScreen'))
const MwlReviewScreen  = lazy(() => import('../screens/mwl/MwlReviewScreen'))
const MwlSuccessScreen = lazy(() => import('../screens/mwl/MwlSuccessScreen'))
const MoreScreen       = lazy(() => import('../screens/samples/MoreScreen'))
const UntitledScreen   = lazy(() => import('../screens/UntitledScreen'))
const SignUpScreen     = lazy(() => import('../screens/SignUpScreen'))
const ProductsScreen   = lazy(() => import('../screens/ProductsScreen'))
const SplashScreen     = lazy(() => import('../screens/SplashScreen'))
const QrSignInScreen   = lazy(() => import('../screens/visitor/QrSignInScreen'))
const OtpScreen        = lazy(() => import('../screens/visitor/OtpScreen'))
const CreatePinScreen  = lazy(() => import('../screens/visitor/CreatePinScreen'))
const ConfirmPinScreen = lazy(() => import('../screens/visitor/ConfirmPinScreen'))
const AdvanceAccountScreen = lazy(() => import('../screens/AdvanceAccountScreen'))
const CalculatorScreen  = lazy(() => import('../screens/CalculatorScreen'))
const ProductDetailScreen = lazy(() => import('../screens/ProductDetailScreen'))
// ─────────────────────────────────────────────────────────────────────────────

function ScreenLoader() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress size={28} thickness={4} sx={{ color: '#0052CC' }} />
    </Box>
  )
}

export default function AppRouter() {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/home-app" element={<HomeScreen loggedIn />} />
        <Route path="/my-loan" element={<MyLoanScreen />} />
        <Route path="/mwl-about" element={<MwlAboutScreen />} />
        <Route path="/mwl-loan" element={<MwlLoanScreen />} />
        <Route path="/mwl-guarantor" element={<MwlGuarantorScreen />} />
        <Route path="/mwl-review" element={<MwlReviewScreen />} />
        <Route path="/mwl-success" element={<MwlSuccessScreen />} />
        <Route path="/nonmwl-about" element={<MwlAboutScreen nonMwl />} />
        <Route path="/nonmwl-loan" element={<MwlLoanScreen nonMwl />} />
        <Route path="/nonmwl-review" element={<MwlReviewScreen nonMwl />} />
        <Route path="/nonmwl-success" element={<MwlSuccessScreen product="Non-MWL Loan" />} />
        <Route path="/more" element={<MoreScreen />} />
        <Route path="/untitled" element={<UntitledScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
        <Route path="/qr-signin" element={<QrSignInScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/create-pin" element={<CreatePinScreen />} />
        <Route path="/confirm-pin" element={<ConfirmPinScreen />} />
        <Route path="/advance" element={<AdvanceAccountScreen />} />
        <Route path="/calculator" element={<CalculatorScreen />} />
        <Route path="/product-detail" element={<ProductDetailScreen />} />

        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/home?v=1" replace />} />
      </Routes>
    </Suspense>
  )
}
