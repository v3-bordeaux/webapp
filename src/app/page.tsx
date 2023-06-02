'use client'
import React, { useState } from 'react'

import GlobalMap, {bikesOrPlaces} from '@/components/molecules/Maps/GlobalMap'
import { RentInProgress } from '@/components/organisms/Account/RentInProgress'

export default function Map() {
  const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<bikesOrPlaces>('bikes')

  return (
    <main className="relative w-full">
      <GlobalMap showBikesOrPlaces={showBikesOrPlaces} />

      <section className="bg-slate-200 absolute bottom-0 right-0 p-4">
        <button
          className={showBikesOrPlaces === 'bikes' ? 'bg-slate-400' : ''}
          onClick={() => setShowBikesOrPlaces('bikes')}
        >
          Vélos
        </button>
        <button
          className={showBikesOrPlaces === 'places' ? 'bg-slate-400' : ''}
          onClick={() => setShowBikesOrPlaces('places')}
        >
          Places
        </button>
      </section>

      <section className="absolute bottom-0 left-0 p-4">
        <RentInProgress/>
      </section>
    </main>
  )
}
