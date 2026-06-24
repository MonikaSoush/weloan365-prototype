import { useNavigate, useSearchParams } from 'react-router-dom'
import PinView from './PinView'
import { useFlow } from '../../workspace/FlowContext'

export default function CreatePinScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { flow, setFlow } = useFlow()
  const suffix = params.get('next') ? '?next=' + encodeURIComponent(params.get('next')!) : ''
  const backPath = flow === 'Staff' ? '/staff-signup-info' : '/otp'
  return (
    <PinView
      title="Create 4-digit PIN"
      subtitle="You'll use this to sign in and approve actions"
      onBack={() => navigate(backPath + suffix)}
      onComplete={() => navigate('/confirm-pin' + suffix)}
    />
  )
}
