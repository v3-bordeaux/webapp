import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { VcubResponse } from '@/_types/tbm/ws/station'

export const tbmWSApi = createApi({
  reducerPath: 'tbmWSApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/tbm/ws/'
  }),
  endpoints: (builder) => ({
    getVcubs: builder.query<VcubResponse, void>({
      query: () => ({
        url: `/vcubs`,
        credentials: 'include'
      })
    })
  })
})

export const { useGetVcubsQuery } = tbmWSApi
