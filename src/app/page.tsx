'use client'
import React, { useState } from 'react'

import GlobalMap, {bikesOrPlaces} from '@/components/molecules/Maps/GlobalMap'
import { RentInProgress } from '@/components/organisms/Account/RentInProgress'
import { Bicycle, CheckIn, Location, ProductHuntFill } from 'akar-icons'

export default function Map() {
  const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<bikesOrPlaces>('bikes')

  function toggleShowBikesOrPlaces() {
    setShowBikesOrPlaces(showBikesOrPlaces === 'bikes' ? 'places' : 'bikes');
  }

  return (
    <main className="relative w-full">
      <GlobalMap showBikesOrPlaces={showBikesOrPlaces} />

      <section className="container pointer-events-none py-4 absolute inset-0 flex items-end gap-8">
        <div className="pointer-events-auto flex-grow">
          <RentInProgress/>
        </div>

        <div className="flex flex-col gap-4">
          <button className="pointer-events-auto rounded-full p-3 bg-cta-1 border-2 border-text-1 shadow-brut active:shadow-none active:translate-x-1 active:translate-y-1">
            <Location className="h-8 w-8"/>
          </button>

          <button 
            className="pointer-events-auto flex flex-col gap-2 overflow-hidden rounded-full border-2 border-text-1 bg-background-3 shadow-brut active:shadow-none active:translate-x-1 active:translate-y-1"
            onClick={toggleShowBikesOrPlaces}
          >
            <div
              className={'rounded-full p-3' + (showBikesOrPlaces === 'bikes' ? ' bg-cta-1 ring-2 ring-text-1' : '')}
              >
              <Bicycle className="h-8 w-8"/>
            </div>
            <div
              className={'rounded-full p-3' + (showBikesOrPlaces === 'places' ? ' bg-cta-1 ring-2 ring-text-1' : '')}
              >
              <ProductHuntFill className="h-8 w-8"/>
            </div>
          </button>
        </div>
        
      </section>
        

      
    </main>
  )
}
