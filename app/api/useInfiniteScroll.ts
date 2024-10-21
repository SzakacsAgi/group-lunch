import { OperationVariables, QueryResult } from '@apollo/client'
import { useState } from 'react'
import { RestaurantDataResponse } from '../../interface'

interface ApiResponse<T> {
  data: T[] | null
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  allPage: number | null
}

const useInfiniteScroll = <T, K extends string>(key: K, pageSize: number) => {
  type FetchItems = (page: number, pageSize: number) => Promise<QueryResult<RestaurantDataResponse<T, K>, OperationVariables>>

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
      setResponse((currentResponse) => ({ ...currentResponse, page: 0 }))
    }
    try {
      const result = await fetchItems(response.page, pageSize)
      setResponse((currentResponse) => ({
        ...currentResponse,
        hasMore: result!.data![key]!.meta!.pagination!.pageCount !== currentResponse.page - 1,
        page: currentResponse.page + 1,
        data: result.data![key]!.data,
        loading: false,
        error: null,
      }))
    } catch (error) {
      console.error(error)
      setResponse((currentResponse) => ({ ...currentResponse, error: 'Was not able to fetch' }))
    } finally {
      setResponse((currentResponse) => ({ ...currentResponse, loading: false }))
    }
  }

  return { fetchData, response }
}

export { useInfiniteScroll }
