'use client'
import React from 'react'
import { useGetRentsCompletedQuery } from '@/redux/services/cykleoApi'

import { H2, Spinner, Card } from '@/components/atoms'
import RentCompletedCard from '@/components/molecules/RentCompletedCard'

import type { Rent } from '@/_types/cykleo/rent'

export function RentCompleted() {
  const { isLoading, isFetching, data, error } = useGetRentsCompletedQuery(null)

  return (
    <Card>
      {isFetching || isLoading ? (
        <Spinner />
      ) : (
        <>
          <H2>Location terminées</H2>
          <ul className="flex flex-col gap-2">
            {data.content.map((rent: Rent) => (
              <li key={rent.id}>
                <RentCompletedCard rent={rent} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  )
}
