import useSWR from 'swr'

async function fetcher(...args) {
    return fetch(...args).then(res => res.json())
  }

export function useLogin(fetch = true) {
    const fetchUrl = '/api/auth/login'
    const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher, { refreshInterval: 5000 })
  
    return {
      data,
      loading: !error && !data,
      error,
    };
  }