import { useLocation } from '@remix-run/react'
import { useMemo } from 'react'

export const useGetCurrentUrlWithQueryString = (
  queryString: Record<string, string | boolean | undefined>
) => {
  const { pathname, search } = useLocation()

  const modifiedSearch = useMemo(() => {
    const searchParams = new URLSearchParams(search)

    Object.entries(queryString).forEach(([key, value]) => {
      if (value === undefined) searchParams.delete(key)
      else searchParams.set(key, String(value))
    })

    return searchParams.toString()
  }, [search, queryString])

  return `${pathname}${modifiedSearch ? '?' : ''}${modifiedSearch}`
}
