import { useState } from 'react'

interface ApiResponse<T> {
  data: T[] | null
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  allPage: number | null
}

const useInfiniteScroll = <T>(pageSize: number) => {
  type FetchItems = (page: number, pageSize: number) => Promise<T[]>

  const [response, setResponse] = useState<ApiResponse<T>>({
    data: [],
    loading: true,
    error: null,
    page: 0,
    hasMore: true,
    allPage: -1,
  })

  const fetchData = async (fetchItems: FetchItems, toResetItems: boolean) => {
    setResponse((response) => ({ ...response, loading: true }))
    if (toResetItems) {
      setResponse((response) => ({ ...response, page: 0 }))
    }
    try {
      const result = await fetchItems(response.page, pageSize)
      setResponse((response) => ({
        ...response,
        hasMore: response.allPage === response.page - 1,
        page: response.page + 1,
        data: result,
        loading: false,
        error: null,
      }))
    } catch (error) {
      console.error(error)
      setResponse((response) => ({ ...response, error: 'Was not be able to fetch' }))
    } finally {
      setResponse((response) => ({ ...response, loading: false }))
    }
  }

  return { fetchData, response }
}

export { useInfiniteScroll }
