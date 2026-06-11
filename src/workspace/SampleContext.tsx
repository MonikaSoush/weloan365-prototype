import { createContext, useContext, useState, ReactNode } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Global sample variant — a prototype-wide toggle (like the user flow).
//   • Sample 1 → Home screen shows the bottom navigation bar
//   • Sample 2 → Home screen hides the bottom navigation bar
//
// Persisted to localStorage so it survives the preview's full-page reloads.
// ─────────────────────────────────────────────────────────────────────────────

export type Sample = '1' | '2'
export const SAMPLES: { id: Sample; label: string }[] = [
  { id: '1', label: 'Sample 1' },
  { id: '2', label: 'Sample 2' },
]

const STORAGE_KEY = 'weloan-sample'

function readStored(): Sample {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === '1' || v === '2') return v
  } catch {
    /* localStorage unavailable */
  }
  return '1'
}

interface SampleContextValue {
  sample: Sample
  setSample: (s: Sample) => void
}

const SampleContext = createContext<SampleContextValue>({ sample: '1', setSample: () => {} })

export function SampleProvider({ children }: { children: ReactNode }) {
  const [sample, setSampleState] = useState<Sample>(readStored)

  const setSample = (s: Sample) => {
    setSampleState(s)
    try {
      localStorage.setItem(STORAGE_KEY, s)
    } catch {
      /* ignore */
    }
  }

  return <SampleContext.Provider value={{ sample, setSample }}>{children}</SampleContext.Provider>
}

export function useSample() {
  return useContext(SampleContext)
}
