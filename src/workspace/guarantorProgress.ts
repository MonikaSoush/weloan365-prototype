import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Shared guarantor-confirmation progress = number of completed steps (0..3).
// Steps: Open SMS Link · Review Loan · Confirm as Guarantor.
// 0 = waiting (Open SMS Link is the active step) · 3 = fully confirmed.
// The borrower's submitted screen watches this; the guarantor web flow bumps it.
// Monotonic — only ever advances. Resets on refresh.
// ─────────────────────────────────────────────────────────────────────────────
let value = 0
const subs = new Set<() => void>()

export function getGuarantorProgress() {
  return value
}

export function setGuarantorProgress(next: number) {
  const clamped = Math.max(value, Math.min(3, next)) // monotonic, capped at 3
  if (clamped !== value) {
    value = clamped
    subs.forEach((fn) => fn())
  }
}

export function resetGuarantorProgress() {
  value = 0
  subs.forEach((fn) => fn())
}

export function useGuarantorProgress() {
  const [v, setV] = useState(value)
  useEffect(() => {
    const fn = () => setV(value)
    subs.add(fn)
    fn()
    return () => {
      subs.delete(fn)
    }
  }, [])
  return v
}
