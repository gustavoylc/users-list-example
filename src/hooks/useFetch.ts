import { useEffect, useState } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(async (response) => await response.json())
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          setError(error)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
