import { useFlow, type UserFlow } from './FlowContext'

// ─────────────────────────────────────────────────────────────────────────────
// The "home" destination after splash:
//   • Visitor              → Welcome screen (then they tap through to Products)
//   • Applicant / Borrower → Products tab
// Keep this in sync with SplashScreen's auto-advance logic.
// ─────────────────────────────────────────────────────────────────────────────
export function homePath(flow: UserFlow): string {
  if (flow === 'Visitor' || flow === 'Staff') return '/welcome'
  return '/products'
}

export function useHomePath(): string {
  const { flow } = useFlow()
  return homePath(flow)
}
