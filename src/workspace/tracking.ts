// ─────────────────────────────────────────────────────────────────────────────
// Application tracking — single source of truth for the loan-application stages.
// Used by the Application Tracker screen and by the My Loans "Requests" status
// chip, so the request status always follows where the application is.
// ─────────────────────────────────────────────────────────────────────────────
export type StageKey = 'application' | 'assessment' | 'decision' | 'approve'

export interface TrackStage {
  key: StageKey
  label: string // stepper label (\n allowed)
  state: 'done' | 'active' | 'pending'
  info: string // detail line shown under the stepper
}

export const TRACK_STAGES: TrackStage[] = [
  { key: 'application', label: 'Application', state: 'done', info: 'Application · Submitted' },
  { key: 'assessment', label: 'Assessment', state: 'active', info: 'Assessment · In progress · Est. 2 days' },
  { key: 'decision', label: 'Decision', state: 'pending', info: 'Decision · Pending assessment' },
  { key: 'approve', label: 'Approve', state: 'pending', info: 'Approve · Final approval after decision' },
]

// The stage the application is currently at.
export function activeStage(): TrackStage {
  return TRACK_STAGES.find((s) => s.state === 'active') ?? TRACK_STAGES[0]
}

// Status chip per stage — the request card shows the chip for the active stage.
export const STAGE_CHIP: Record<StageKey, { label: string; color: string; bg: string }> = {
  application: { label: 'Submitted', color: '#275CB2', bg: '#D8E9FF' },
  assessment: { label: 'Under Assessment', color: '#275CB2', bg: '#D8E9FF' },
  decision: { label: 'In Decision', color: '#7A4DD6', bg: '#EFE7FB' },
  approve: { label: 'Approved', color: '#1FA85C', bg: '#DCF5E6' },
}
