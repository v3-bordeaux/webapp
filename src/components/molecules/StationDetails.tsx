import { createPortal } from 'react-dom'
import { H2 } from '@/components/atoms'
import { Bicycle, BicycleElectric, ChevronLeft, Parking } from '@v3-bordeaux/akar-icons'

import type { Station } from '@/_types/tbm/ws/station'

export interface StationDetailsProps {
  station: Station
  onClose: () => void
}

export function StationDetails({ station, onClose }: StationDetailsProps) {
  return (
    station &&
    createPortal(
      <section className="z-50 fixed bottom-0 left-0 w-full h-full">
        <div className="absolute inset-0 bg-backdrop-2/50"></div>

        <article className="z-50 container py-6 rounded-t-2xl fixed bottom-0 left-0 w-full bg-background-3">
          <button onClick={onClose} className="py-4 -mt-4 flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Retour à la carte</span>
          </button>

          <H2 className="mb-4">{station.name}</H2>

          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <Bicycle className="h-8 w-8" />
              <span>{station.nbBikeAvailable}</span>
            </div>

            <div className="flex items-center gap-2">
              <BicycleElectric className="h-8 w-8" />
              <span>{station.nbElectricBikeAvailable}</span>
            </div>

            <div className="flex items-center gap-2">
              <Parking className="h-8 w-8" />
              <span>{station.nbPlaceAvailable}</span>
            </div>
          </div>
        </article>
      </section>,
      document.body
    )
  )
}
