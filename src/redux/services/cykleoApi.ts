import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RentResponse } from '@/_types/cykleo/rent'
import { Station } from '@/_types/cykleo/station'
import { SubscriptionsRequest } from '@/_types/cykleo/subcriptions'
import authenticatedFetchBaseQuery from './authenticatedQuery'

export const cykleoApi = createApi({
  reducerPath: 'cykleoApi',
  baseQuery: authenticatedFetchBaseQuery({
    baseUrl: '/cykleo/pu',
    prepareHeaders(headers, api) {
      const token = api.getState().cykleoTokenReducer.value
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getRentsInProgress: builder.query<RentResponse, void>({
      query: () => ({
        url: '/rents/in_progress?size=1&sort=beginDate,DESC&version=2'
      })
    }),
    getRentsCompleted: builder.query<RentResponse, void>({
      query: () => ({
        url: '/rents/completed?sort=beginDate,DESC'
      })
    }),
    getStation: builder.query<Station, { stationId: number }>({
      query: ({ stationId }) => ({
        url: `/stations/${stationId}`
      })
    }),
    getAuthInformations: builder.query<any, void>({
      query: () => ({
        url: '/auth'
      })
    }),
    getSubscriptions: builder.query<SubscriptionsRequest, void>({
      query: () => ({
        url: '/subscriptions'
      })
    }),
    login: builder.mutation<any, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: `/auth`,
        credentials: 'omit',
        method: 'POST',
        body: {
          organizationId: 7,
          username,
          password
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    })
  })
})

export const {
  useGetRentsInProgressQuery,
  useGetRentsCompletedQuery,
  useGetAuthInformationsQuery,
  useGetStationQuery,
  useGetSubscriptionsQuery,
  useLoginMutation
} = cykleoApi
