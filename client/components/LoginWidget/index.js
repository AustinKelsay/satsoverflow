import { useEffect } from 'react'
import { useRouter } from 'next/router'

import styles        from './styles.module.css'
import { useLogin }  from '../../hooks/useAPI'
import Spinner from "../icons/Spinner"
import Error         from '../Error'
import QrCode        from '../QrCode'
import { useUserContext } from '../../store/UserContext'

export default function LoginWidget({ redirect }) {
  const router   = useRouter();
  const [ user ] = useUserContext();
  const { data, isLoading, isError } = useLogin(redirect);

  useEffect(() => {
    if (user?.key) {
      router.push('/profile')
    }
  }, [ data, user?.key, router ])

  return (
    <>
      { isError
        ? <Error />
        : isLoading
          ? <Spinner />
          : data && data.lnurl
            ? <LoginPrompt data={ data.lnurl }/>
            : <Spinner />
      }
    </>
  )
}

function LoginPrompt({ data }) {
  const title = 'Login using Lightning Wallet'

  return (
    <div className={styles.container}>
      <QrCode title={ title } data={ data }/>
    </div>
  )
}