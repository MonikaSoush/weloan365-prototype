import { useFlow, type UserFlow } from './FlowContext'
import { useSample, type Sample } from './SampleContext'

// ─────────────────────────────────────────────────────────────────────────────
// The "home" destination differs per sample, so screens shared across both
// samples must never hardcode /home (a Sample-2-only route).
//   • Sample 2 → the nav-less Home screen (/home)
//   • Sample 1 → the flow's default bottom-nav tab
//                (Visitor → Products, Applicant/Borrower → My Loan)
// Keep this in sync with SplashScreen's auto-advance logic.
// ─────────────────────────────────────────────────────────────────────────────
export function homePath(sample: Sample, flow: UserFlow): string {
  if (sample === '2') return '/home'
  return flow === 'Visitor' ? '/products' : '/my-loan'
}

export function useHomePath(): string {
  const { sample } = useSample()
  const { flow } = useFlow()
  return homePath(sample, flow)
}
