import { ReactNode } from 'react'
import { usePinGate } from '../workspace/PinGateContext'
import { useFlow } from '../workspace/FlowContext'
import PinGateScreen from '../screens/PinGateScreen'

export default function RequirePin({ children }: { children: ReactNode }) {
  const { unlocked, unlock } = usePinGate()
  const { flow } = useFlow()

  if (flow === 'Visitor' || flow === 'Staff') return <>{children}</>

  if (!unlocked) {
    return <PinGateScreen onSuccess={unlock} />
  }

  return <>{children}</>
}
