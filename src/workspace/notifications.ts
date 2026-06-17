// ─────────────────────────────────────────────────────────────────────────────
// Runtime notifications — in-memory feed items raised during a demo run (e.g. a
// Staff Loan disbursement). Shown at the top of Notifications → All.
//
// Deliberately NOT persisted: a full-page refresh resets to the default seeded
// feed. Cleared at the start of each run (the Select User Flow screen).
// ─────────────────────────────────────────────────────────────────────────────
export interface Notice {
  kind: 'disbursement'
  title: string
  body: string
  time: string
}

let notices: Notice[] = []

export function getNotices(): Notice[] {
  return notices
}

export function addNotice(n: Notice) {
  notices = [n, ...notices]
}

export function clearNotices() {
  notices = []
}
