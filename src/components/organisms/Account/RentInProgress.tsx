'use client'
import React from 'react'
import { useGetRentsInProgressQuery } from '@/redux/services/cykleoApi'

import { H2, Spinner, Card } from '@/components/atoms'
import RentInProgressCard from '@/components/molecules/RentInProgressCard'

export function RentInProgress() {
  const { isLoading, isFetching, data, error } = useGetRentsInProgressQuery(null)

  // const data = {
  //     content: [{
  //         "beginDate": "2023-05-20T12:53:11Z",
  //         "endDate": "2023-05-20T13:08:50Z",
  //         "duration": 939,
  //         "status": "NO_TIME_EXCEEDANCE",
  //         "calculatedDistance": 3341,
  //         "straightLineDistance": 2461,
  //         "organization": 7,
  //         "stationStart": 272,
  //         "stationEnd": 400,
  //         "subscription": 2877129,
  //         "bike": 13283,
  //         "id": 45684567,
  //         "creationDate": "2023-05-20T13:08:53Z",
  //         "referenceDate": "2023-05-20T12:53:11Z",
  //         "exportDate": "2023-05-21T01:05:12Z",
  //         "type": "VLS_STANDARD",
  //         "amount": 0,
  //         "previousBalance": 800,
  //         "newBalance": 800,
  //         "paid": true,
  //         "customer": 248554,
  //         "cardNumber": "2032087802"
  //     }],
  //     totalElements: 1,
  // };
  return (
    <div className="relative rounded-xl text-text-1 bg-secondary-1 px-5 py-4 border-2 border-text-1">
      {isFetching || isLoading ? (
        <Spinner />
      ) : data.totalElements === 0 ? (
        <>
          <p>Location en cours</p>
          <span>Pas de location en cours</span>
        </>
      ) : (
        <RentInProgressCard rent={data.content[0]} />
      )}
    </div>
  )
}
