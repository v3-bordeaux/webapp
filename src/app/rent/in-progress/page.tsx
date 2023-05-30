'use client'
import { useEffect, useState } from 'react'

import { H2, Spinner } from '@/components/atoms'
import { useGetRentsInProgressQuery } from '@/redux/services/cykleoApi'
import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { useGetStationQuery } from '@/redux/services/cykleoApi'

import type { Station } from '@/_types/tbm/ws/station'
import Link from 'next/link'
import { Alarm, ChevronLeft, Heart, Money, TriangleAlert } from 'akar-icons'
import RentInProgressMap from '@/components/molecules/Maps/RentInProgressMap'

export default function RentInProgress() {
  const rentsQuery = useGetRentsInProgressQuery(null)

  const rent = rentsQuery.data?.content[0] ?? null;

  const [stationStart, setStationStart] = useState<Station>(null)

  const vcubsQuery = useGetVcubsQuery()
  const stationStartQuery = useGetStationQuery({
    stationId: rent?.stationStart
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

            { stationStart && 
              <article className="rounded-2xl border-2 border-text-1 overflow-hidden">
                <RentInProgressMap stationStart={stationStart}/>
              </article>
            }

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
