'use client'
import React, { useState } from 'react'

import GlobalMap, { bikesOrPlaces } from '@/components/molecules/Maps/GlobalMap'
import { RentInProgress } from '@/components/organisms/Account/RentInProgress'
import { Bicycle, Parking } from '@v3-bordeaux/akar-icons'
import { CenterMapOnPosition } from '@/components/molecules/Maps/Controls/CenterMapOnPosition'
import { StationDetails } from '@/components/molecules/StationDetails'

import type { Feature } from 'ol'
import type { Station } from '@/_types/tbm/ws/station'
import SearchStation from '@/components/molecules/SearchStation'
import { BottomSheet } from '@/components/molecules/BottomSheet'

export default function Map() {
  const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<bikesOrPlaces>('bikes')
  const [showStation, setShowStation] = useState<Station>()

  const toggleShowBikesOrPlaces = () => {
    setShowBikesOrPlaces(showBikesOrPlaces === 'bikes' ? 'places' : 'bikes')
  }

  const handleFeatureClick = (feature: Feature) => {
    const station = feature.get('data')?.station
    if (!station) {
      return
    }

    setShowStation(station)
  }

  const handleCloseStationDetails = () => {
    setShowStation(null)
  }

  return (
    <main className="relative w-full">
      <BottomSheet isOpen={!!showStation} onClick={handleCloseStationDetails}>
        <StationDetails station={showStation} />
      </BottomSheet>

      <GlobalMap showBikesOrPlaces={showBikesOrPlaces} onFeatureClick={handleFeatureClick}>
        <section className="container pointer-events-none z-40 py-4 absolute inset-0">
          <SearchStation />
        </section>

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
