'use client'
import React from 'react'
import { useGetRentsInProgressQuery } from '@/redux/services/cykleoApi'

import { H2, Spinner } from '@/components/atoms'
import RentInProgressCard from '@/components/molecules/RentInProgressCard'

export function RentInProgress() {
  const { isLoading, isFetching, data, error } = useGetRentsInProgressQuery(null)

  // const data = {
  //   content: [
  //     {
  //       id: 20230659,
  //       beginDate: '2023-06-05T21:01:25Z',
  //       status: 'NO_TIME_EXCEEDANCE',
  //       organization: 7,
  //       stationStart: 260,
  //       subscription: 2877129,
  //       bike: 5927,
  //       cardNumber: '2032087802'
  //     }
  //   ],
  //   totalElements: 1
  // }

  let content
  if (!isLoading) {
    if (error) {
      content = (
        <>
          <H2>Connectez-vous</H2>
          <p>Pour afficher votre vélo, vos trajets, et plus encore</p>
        </>
      )
    }

    if (data?.totalElements === 0) {
      content = <span>Pas de location en cours</span>
    }
    if (data?.totalElements === 1) {
      content = <RentInProgressCard rent={data?.content[0]} />
    }
  }

  return (
    <div className="relative rounded-3xl text-text-1 bg-secondary-1 shadow-brut px-5 py-4 border-2 border-text-1">
      {content}
    </div>
  )
}
