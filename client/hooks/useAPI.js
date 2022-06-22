import useSWR from 'swr'

export function useLogin(fetch = true) {
    const fetchUrl = '/api/auth/login'
    const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher, { refreshInterval: 5000 })
  
    return {
      data,
      loading: !error && !data,
      error,
    };
  }