import { useNavigate } from 'react-router-dom'
import PinView from './PinView'

export default function ConfirmPinScreen() {
  const navigate = useNavigate()
  return (
    <PinView
      title="Confirm PIN"
      subtitle="Type the same 4 digits to confirm"
      onBack={() => navigate('/create-pin')}
      onComplete={() => navigate('/home-app?v=1')}
    />
  )
}
