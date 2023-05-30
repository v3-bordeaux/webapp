'use client'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { H2, Spinner } from '@/components/atoms'
import { H1 } from '@/components/atoms/H1'
import { useGetRentsInProgressQuery } from '@/redux/services/cykleoApi'
import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { useGetStationQuery } from '@/redux/services/cykleoApi'

import type { Rent } from '@/_types/cykleo/rent'
import type { Station } from '@/_types/tbm/ws/station'
import Link from 'next/link'
import { Alarm, ArrowBack, ChevronLeft, FaceVeryHappy, Heart, Money, TriangleAlert } from 'akar-icons'

export default function RentInProgress() {
  const rentsQuery = useGetRentsInProgressQuery(null)

  rentsQuery.data = {
    content: [
      {
        beginDate: '2023-05-20T12:53:11Z',
        endDate: '2023-05-20T13:08:50Z',
        duration: 939,
        status: 'NO_TIME_EXCEEDANCE',
        calculatedDistance: 3341,
        straightLineDistance: 2461,
        organization: 7,
        stationStart: 272,
        stationEnd: 400,
        subscription: 2877129,
        bike: 13283,
        id: 45684567,
        creationDate: '2023-05-20T13:08:53Z',
        referenceDate: '2023-05-20T12:53:11Z',
        exportDate: '2023-05-21T01:05:12Z',
        type: 'VLS_STANDARD',
        amount: 0,
        previousBalance: 800,
        newBalance: 800,
        paid: true,
        customer: 248554,
        cardNumber: '2032087802'
      }
    ],
    totalPages: 1,
    totalElements: 1,
    last: true,
    number: 0,
    sort: [
        {
        direction: 'desc',
        property: 'id',
        ignoreCase: true,
        nullHandling: 'true',
        descending: true,
        ascending: true
      }
    ],
    size: 1,
    numberOfElements: 1,
    first: true,
  }

  const rent = rentsQuery.data?.content[0] ?? null;

  const [stationStart, setStationStart]: [Station, Function] = useState(null)

  const vcubsQuery = useGetVcubsQuery()
  const stationStartQuery = useGetStationQuery({
    stationId: rent.stationStart
  })

  useEffect(() => {
    if (!vcubsQuery.data || !stationStartQuery.data) {
      return
    }

    let stationName = stationStartQuery.data.assetStation.commercialName.toLowerCase()
    let stationFound = vcubsQuery.data.lists.find((station) => {
      return station.name.toLowerCase() === stationName
    })

    if (stationFound) {
      setStationStart(stationFound)
    }
  }, [vcubsQuery, stationStartQuery])

  return (
    <main className="container mx-auto grid grid-cols-4 gap-y-10 gap-x-4 pt-4 pb-10">

      <section className="col-span-4 flex gap-8 items-center">
        <Link href="/map" className="flex items-center justify-center p-2 text-text-1 bg-cta-1 border-2 border-text-1 rounded-full">
          <ChevronLeft strokeWidth="2" className=""/>
          <span className="hidden">Retour à la carte</span>
        </Link>
        <H2>Mon vélo</H2>
      </section>

      {rentsQuery.isFetching || rentsQuery.isLoading ? (
        <section className="col-span-4 flex items-center justify-center">
          <Spinner/>
        </section>
      ) : (
        <>
          <section className="col-span-4 flex flex-col gap-4">
            <div className="rounded-2xl border-2 border-text-1 aspect-video w-full bg-background-1"></div>
            
            <div className='grid grid-cols-4 gap-x-4'>
              <article className="col-span-2 flex items-center gap-2 text-sm md:text-md rounded-full border-2 border-text-1 bg-primary-1 px-4 py-2">
                <Heart/>
                <span>État</span>
              </article>
              
              <button className="col-span-2 flex items-center gap-2 text-sm md:text-md rounded-full border-2 border-text-1 bg-cta-1 px-4 py-2">
                <TriangleAlert/>
                <span>Problème ?</span>
              </button>
            </div>
          </section>

          <section className="col-span-4 flex flex-col gap-2">
            <H2>Mon trajet</H2>

            <div className='grid grid-cols-4 gap-x-4'>
              <article className="col-span-3 flex items-center gap-2 text-sm md:text-md rounded-2xl border-2 border-text-1 bg-primary-1 px-4 py-2">
                <Alarm/>
              </article>

              <button className="col-span-1 flex flex-col items-center gap-2 text-sm md:text-md rounded-2xl border-2 border-text-1 bg-cta-1 px-4 py-2">
                <Money/>
                <span>Tarifs</span>
              </button>
            </div>
          </section>

          <section className="col-span-4 flex flex-col gap-2">
            <H2>À propos du vélo</H2>

            <article className="flex flex-col gap-2 rounded-2xl border-2 border-text-1 bg-primary-1 px-4 py-2">
              <H2>Emprunt gratuit</H2>
              <p className="text-sm md:text-md">Vous avez 30 minutes gratuites lorsque vous empruntez un vélo</p>
            </article>
          </section>
        </>
      )}
    </main>
  )
}
