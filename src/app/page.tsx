'use client'
import React, { useState } from 'react'

import GlobalMap, {bikesOrPlaces} from '@/components/molecules/Maps/GlobalMap'
import { RentInProgress } from '@/components/organisms/Account/RentInProgress'
import { Bicycle, CheckIn, ProductHuntFill } from 'akar-icons'

export default function Map() {
  const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<bikesOrPlaces>('bikes')

  return (
    <main className="relative w-full">
      <GlobalMap showBikesOrPlaces={showBikesOrPlaces} />

      <section className="absolute bottom-0 right-0 p-4">
        <div className="flex flex-col gap-2 overflow-hidden border-2 border-text-1 bg-background-3 drop-shadow-brut rounded-full">
          <button
            className={'rounded-full p-3.5' + (showBikesOrPlaces === 'bikes' ? ' bg-cta-1 ring-2 ring-text-1' : '')}
            onClick={() => setShowBikesOrPlaces('bikes')}
            >
            <Bicycle className="h-8 w-8"/>
          </button>
          <button
            className={'rounded-full p-3.5' + (showBikesOrPlaces === 'places' ? ' bg-cta-1 ring-2 ring-text-1' : '')}
            onClick={() => setShowBikesOrPlaces('places')}
            >
            <ProductHuntFill className="h-8 w-8"/>
          </button>
        </div>
      </section>

      <section className="absolute bottom-0 left-0 p-4">
        <RentInProgress/>
      </section>
    </main>
  )
}
