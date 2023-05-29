'use client'
import React, { useState } from 'react'
import { RootState } from '@/redux/store'
import { useAppSelector } from '@/redux/hooks'

import GlobalMap, {bikesOrPlaces} from '@/components/molecules/Maps/GlobalMap'
import dynamic from 'next/dynamic'


export default function Map() {
  const token = useAppSelector((state: RootState) => state.cykleoTokenReducer.value)
  const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<bikesOrPlaces>('bikes')
  const GlobalMapWithNoSSR = dynamic(() => import("@/components/molecules/Maps/GlobalMap"), {
    ssr: false
  });
  
  return (
    <main className="relative w-full">
      <GlobalMapWithNoSSR showBikesOrPlaces={showBikesOrPlaces} />

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
    </main>
  )
}
