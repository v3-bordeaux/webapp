import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RentResponse } from '@/_types/cykleo/rent'
import { Station } from '@/_types/cykleo/station'
import { SubscriptionsRequest } from '@/_types/cykleo/subcriptions'

export const cykleoApi = createApi({
  reducerPath: 'cykleoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/cykleo/pu'
  }),
  endpoints: (builder) => ({
    getRentsInProgress: builder.query<RentResponse, void>({
      query: () => ({
        url: '/rents/in_progress?size=1&sort=beginDate,DESC&version=2',
        credentials: 'include'
      })
    }),
    getRentsCompleted: builder.query<RentResponse, void>({
      query: () => ({
        url: '/rents/completed?sort=beginDate,DESC',
        credentials: 'include'
      })
    }),
    getStation: builder.query<Station, { stationId: number }>({
      query: ({ stationId }) => ({
        url: `/stations/${stationId}`,
        credentials: 'include'
      })
    }),
    getAuthInformations: builder.query<any, void>({
      query: () => ({
        url: '/auth',
        credentials: 'include'
      })
    }),
    getSubscriptions: builder.query<SubscriptionsRequest, void>({
      query: () => ({
        url: '/subscriptions',
        credentials: 'include'
      })
    }),
    login: builder.mutation<any, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: `/auth`,
        credentials: 'include',
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
