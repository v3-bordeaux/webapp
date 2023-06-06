'use client'
import React, { useEffect, useState } from 'react'

import GlobalMap from '@/components/molecules/Maps/GlobalMap'
import { RentInProgress } from '@/components/organisms/Account/RentInProgress'
import { Bicycle, Parking } from '@v3-bordeaux/akar-icons'
import { CenterMapOnPosition } from '@/components/molecules/Maps/Controls/CenterMapOnPosition'
import { StationDetails } from '@/components/molecules/StationDetails'

import SearchStation from '@/components/molecules/SearchStation'
import { BottomSheet } from '@/components/molecules/BottomSheet'
import { BikesOrPlaces } from '@/components/molecules/Maps/Styles/Station'
import { useGetRentsInProgressQuery } from '@/redux/services/cykleoApi'
import { useAppSelector } from '@/redux/hooks'

import type { Feature } from 'ol'
import type { Station } from '@/_types/tbm/ws/station'
import type { RootState } from '@/redux/store'

export default function Map() {
  const token = useAppSelector((state: RootState) => state.cykleoTokenReducer.value)
  const rentsQuery = useGetRentsInProgressQuery(null, {
    pollingInterval: 10000,
    skip: !token
  })
  const rent = rentsQuery.data?.content[0] ?? null

  const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<BikesOrPlaces>('bikes')
  const [showStation, setShowStation] = useState<Station>()

  useEffect(() => {
    setShowBikesOrPlaces(!!rent ? 'places' : 'bikes')
  }, [rent])

  const toggleShowBikesOrPlaces = () => {
    setShowBikesOrPlaces(showBikesOrPlaces === 'bikes' ? 'places' : 'bikes')
  }

  const handleClusterFeatureClick = (feature: Feature) => {
    const clusturedFeatures = feature.get('features')

    if (clusturedFeatures.length !== 1) {
      return true
    }

    const station = clusturedFeatures[0].get('data')?.station

    if (station) {
      setShowStation(station)
    }

    return false
  }

  const handleCloseStationDetails = () => {
    setShowStation(null)
  }

  return (
    <main className="relative w-full">
      <BottomSheet isOpen={!!showStation} onClick={handleCloseStationDetails}>
        <StationDetails station={showStation} />
      </BottomSheet>

      <GlobalMap
        showBikesOrPlaces={showBikesOrPlaces}
        onClusterFeatureClick={handleClusterFeatureClick}
      >
        <SearchStation />

        <section className="container pointer-events-none z-30 py-4 absolute inset-0 flex items-end gap-8">
          <div className="pointer-events-auto flex-grow">
            <RentInProgress />
          </div>

          <div className="flex flex-col gap-4">
            <CenterMapOnPosition />

            <button
              className="pointer-events-auto relative flex flex-col overflow-hidden rounded-full border-2 border-text-1 bg-background-3 shadow-brut active:shadow-none active:translate-x-1 active:translate-y-1"
              onClick={toggleShowBikesOrPlaces}
            >
              <div
                className={
                  'absolute left-0 top-0 rounded-full w-full aspect-square bg-cta-1 ring-2 ring-text-1 transition-transform delay-300 ' +
                  (showBikesOrPlaces === 'bikes' ? '' : 'translate-y-full')
                }
              ></div>

              <div className="p-3 z-10">
                <Bicycle className="h-8 w-8" />
              </div>
              <div className="p-3 z-10">
                <Parking className="h-8 w-8" />
              </div>
            </button>
          </div>
        </section>
      </GlobalMap>
    </main>
  )
}
