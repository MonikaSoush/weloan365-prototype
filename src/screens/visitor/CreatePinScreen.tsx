import { useNavigate } from 'react-router-dom'
import PinView from './PinView'

export default function CreatePinScreen() {
  const navigate = useNavigate()
  return (
    <PinView
      title="Create 4-digit PIN"
      subtitle="You'll use this to sign in and approve actions"
      onBack={() => navigate('/otp')}
      onComplete={() => navigate('/confirm-pin')}
    />
  )
}
