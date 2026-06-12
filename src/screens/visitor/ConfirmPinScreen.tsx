import { useNavigate, useSearchParams } from 'react-router-dom'
import PinView from './PinView'
import { useSample } from '../../workspace/SampleContext'
import { useFlow } from '../../workspace/FlowContext'
import { homePath } from '../../workspace/useHomePath'

export default function ConfirmPinScreen() {
  const navigate = useNavigate()
  const { sample } = useSample()
  const { flow } = useFlow()
  const [params] = useSearchParams()
  const next = params.get('next')
  // After the account + PIN are set, continue to the intended apply-loan screen
  // if one was carried through; otherwise land on the home for this sample.
  // Sample 2 has a dedicated logged-in home; Sample 1 uses the flow's tab.
  const done = sample === '2' ? '/home-app?v=1' : homePath(sample, flow)
  return (
    <PinView
      title="Confirm PIN"
      subtitle="Type the same 4 digits to confirm"
      onBack={() => navigate('/create-pin' + (next ? '?next=' + encodeURIComponent(next) : ''))}
      onComplete={() => navigate(next ?? done)}
    />
  )
}
