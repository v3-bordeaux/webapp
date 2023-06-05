'use client'
import React from 'react'
import { useGetRentsInProgressQuery } from '@/redux/services/cykleoApi'

import { Spinner } from '@/components/atoms'
import RentInProgressCard from '@/components/molecules/RentInProgressCard'

export function RentInProgress() {
  const { isLoading, isFetching, data, error } = useGetRentsInProgressQuery(null)

  // const data = {
  //     content: [{
  //         "id": 20230659,
  //         "beginDate": "2023-06-05T21:01:25Z",
  //         "status": "NO_TIME_EXCEEDANCE",
  //         "organization": 7,
  //         "stationStart": 260,
  //         "subscription": 2877129,
  //         "bike": 5927,
  //         "cardNumber": "2032087802"
  //     }],
  //     totalElements: 1,
  // };
  return (
    <div className="relative rounded-3xl text-text-1 bg-secondary-1 shadow-brut px-5 py-4 border-2 border-text-1">
      {isFetching || isLoading ? (
        <Spinner />
      ) : data.totalElements === 0 ? (
        <>
          <span>Pas de location en cours</span>
        </>
      ) : (
        <RentInProgressCard rent={data.content[0]} />
      )}
    </div>
  )
}
