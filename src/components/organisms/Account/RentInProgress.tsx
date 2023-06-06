'use client'
import React from 'react'
import { cykleoApi, useGetRentsInProgressQuery } from '@/redux/services/cykleoApi'

import { H2 } from '@/components/atoms'
import RentInProgressCard from '@/components/molecules/RentInProgressCard'
import Link from 'next/link'
import { useAppSelector } from '@/redux/hooks'

export function RentInProgress() {
  const { isLoading, isFetching, data, error } = useGetRentsInProgressQuery(null)
  const cyckleoToken = useAppSelector((state) => state.cykleoTokenReducer.value)

  console.log(cyckleoToken)
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
    if (!cyckleoToken || error) {
      content = (
        <>
          <H2>Connectez-vous</H2>
          <p>Pour afficher votre vélo, vos trajets, et plus encore</p>
          <Link href="/login" className="after:absolute after:inset-0">
            <span className="hidden">Se connecter</span>
          </Link>
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
