import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { invalidateToken } from '@/redux/features/cykleoTokenSlice'

export default function authenticatedFetchBaseQuery(params) {
  const baseQuery = fetchBaseQuery(params)

  const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    console.log(args)

    let result = await baseQuery(args, api, extraOptions)
    console.log(result)
    if (result.error && result.error.status === 401) {
      api.dispatch(invalidateToken())

      location.href = '/login'
    }
    return result
  }

  return baseQueryWithReauth
}
