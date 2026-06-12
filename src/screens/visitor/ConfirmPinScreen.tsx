import { useNavigate, useSearchParams } from 'react-router-dom'
import PinView from './PinView'
import { useSample } from '../../workspace/SampleContext'
import { useFlow } from '../../workspace/FlowContext'
import { homePath } from '../../workspace/useHomePath'

export default function ConfirmPinScreen() {
  const navigate = useNavigate()
  const { sample } = useSample()
  const { flow, setFlow } = useFlow()
  const [params] = useSearchParams()
  const next = params.get('next')
  // Signing in turns a Visitor into a logged-in user who hasn't borrowed yet,
  // i.e. the "New User" flow. Other flows are already signed in — keep them.
  const signedInFlow = flow === 'Visitor' ? 'New User' : flow
  // After the account + PIN are set, continue to the intended apply-loan screen
  // if one was carried through; otherwise land on the home for this sample.
  // Sample 2 has a dedicated logged-in home; Sample 1 uses the flow's tab.
  const done = sample === '2' ? '/home-app?v=1' : homePath(sample, signedInFlow)
  const complete = () => {
    if (flow === 'Visitor') setFlow('New User')
    navigate(next ?? done)
  }
  return (
    <PinView
      title="Confirm PIN"
      subtitle="Type the same 4 digits to confirm"
      onBack={() => navigate('/create-pin' + (next ? '?next=' + encodeURIComponent(next) : ''))}
      onComplete={complete}
    />
  )
}
