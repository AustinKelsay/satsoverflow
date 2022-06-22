import { useRouter } from 'next/router'
import { useLogin }  from '../../hooks/useAPI'
import Loading       from '../Loading'
import Error         from '../Error'
import QrCode        from '../QrCode'

export default function LoginWidget({ user }) {
  const router = useRouter();
  const { source } = router.query || ''
  const { data, isLoading, isError } = useLogin();

  switch (true) {
  case Boolean(source && user?.key):
    router.push(`/${source}`)
    return
  case Boolean(data && data.lnurl):
    return <QrCode data={data.lnurl}/>
  case Boolean(isError):
    return <Error />
  default:
    return <Loading />
  }
}