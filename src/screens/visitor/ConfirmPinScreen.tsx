import { useNavigate, useSearchParams } from 'react-router-dom'
import PinView from './PinView'

export default function ConfirmPinScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next')
  return (
    <PinView
      title="Confirm PIN"
      subtitle="Type the same 4 digits to confirm"
      onBack={() => navigate('/create-pin' + (next ? '?next=' + encodeURIComponent(next) : ''))}
      // After the account + PIN are set, continue to the intended apply-loan
      // screen if one was carried through; otherwise land on the logged-in home.
      onComplete={() => navigate(next ?? '/home-app?v=1')}
    />
  )
}
