import { useContext, useEffect, useState } from 'react'
import MapContext, { MapContextContent } from '@/components/molecules/Maps/Map/MapContext'
import { Location } from '@v3-bordeaux/akar-icons'
import { useGeolocation } from '@/hooks/useGeolocation'
import { BottomSheet } from '@/components/molecules/BottomSheet'
import { H2 } from '@/components/atoms'

export function CenterMapOnPosition() {
  const { map } = useContext<MapContextContent>(MapContext)
  const { geolocation, setProjection } = useGeolocation()
  const [isAskPermissionBottomSheetOpen, setIsAskPermissionBottomSheetOpen] = useState(false)
  const [canGeolocate, setCanGeolocate] = useState(false)

  useEffect(() => {
    if (!map) {
      return
    }

    setProjection(map.getView().getProjection())
  }, [map, setProjection])

  useEffect(() => {
    if (!geolocation) {
      return
    }

    geolocation.on('error', () => setCanGeolocate(false))
    geolocation.on('change', () => setCanGeolocate(true))
  }, [geolocation])

  const centerMapOnPosition = () => {
    map.getView().setCenter(geolocation.getPosition())
  }

  return (
    <>
      <button
        className={`pointer-events-auto rounded-full p-3 border-2 border-text-1 bg-cta-1 ${
          canGeolocate
            ? ' shadow-brut active:shadow-none active:translate-x-1 active:translate-y-1'
            : ' grayscale'
        }`}
        onClick={canGeolocate ? centerMapOnPosition : () => setIsAskPermissionBottomSheetOpen(true)}
      >
        <Location className="h-8 w-8" />
      </button>

      <BottomSheet
        isOpen={isAskPermissionBottomSheetOpen}
        onClick={() => setIsAskPermissionBottomSheetOpen(false)}
      >
        <H2>Impossible de vous géolocaliser</H2>
        <p className="mt-2">
          Vérifiez que vous avez autorisé le site à accéder à votre géolocalisation. Assurez-vous
          également qu&apos;elle soit activée sur votre appareil.
        </p>
      </BottomSheet>
    </>
  )
}
