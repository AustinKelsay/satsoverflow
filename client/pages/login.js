import LoginWidget from '../components/LoginWidget'

export default function LoginPage() {
  return (
    <div>
      <div>
        Login Page
      </div>
      <p>
        Scan the QR Code below using a compatible Lightning Wallet.
      </p>
      <LoginWidget />
    </div>
  )
}