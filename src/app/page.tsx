'use client'
import React, { useState } from 'react'

import GlobalMap, {bikesOrPlaces} from '@/components/molecules/Maps/GlobalMap'
import { RentInProgress } from '@/components/organisms/Account/RentInProgress'
import { Bicycle, ProductHuntFill } from 'akar-icons'
import { CenterMapOnPosition } from '@/components/molecules/Maps/Controls/CenterMapOnPosition'
import { StationDetails } from '@/components/molecules/Maps/Controls/StationDetails'

export default function Map() {
  const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<bikesOrPlaces>('bikes')

  const toggleShowBikesOrPlaces = ()=>{
    setShowBikesOrPlaces(showBikesOrPlaces === 'bikes' ? 'places' : 'bikes');
  }

  return (
    <main className="relative w-full">
      <GlobalMap showBikesOrPlaces={showBikesOrPlaces}>

        <StationDetails/>

        <section className="container pointer-events-none z-40 py-4 absolute inset-0 flex items-end gap-8">
          <div className="pointer-events-auto flex-grow">
            <RentInProgress/>
          </div>

          <div className="flex flex-col gap-4">
            <CenterMapOnPosition/>

            <button 
              className="pointer-events-auto relative flex flex-col overflow-hidden rounded-full border-2 border-text-1 bg-background-3 shadow-brut active:shadow-none active:translate-x-1 active:translate-y-1"
              onClick={toggleShowBikesOrPlaces}
            >
              <div className={"absolute left-0 top-0 rounded-full w-full aspect-square bg-cta-1 ring-2 ring-text-1 transition-transform delay-300 " + (showBikesOrPlaces === 'bikes' ? '':'translate-y-full')}></div>

              <div className="p-3 z-10">
                <Bicycle className="h-8 w-8"/>
              </div>
              <div className="p-3 z-10">
                <ProductHuntFill className="h-8 w-8"/>
              </div>
            </button>
          </div>
          
        </section>      
      </GlobalMap>
    </main>
  )
}
