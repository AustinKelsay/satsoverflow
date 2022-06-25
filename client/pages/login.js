import styles from "../styles/login.module.css"
import LoginWidget from '../components/LoginWidget'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Login Page
      </div>
      <p className={styles.description}>
        Scan the QR Code below using a compatible Lightning Wallet.
      </p>
      <LoginWidget />
    </div>
  )
}