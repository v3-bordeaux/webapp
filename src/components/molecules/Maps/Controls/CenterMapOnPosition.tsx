import { useContext, useEffect, useState } from 'react'
import MapContext, { MapContextContent } from '@/components/molecules/Maps/Map/MapContext'
import { Location } from '@v3-bordeaux/akar-icons'
import { useGeolocation } from '@/hooks/useGeolocation'
import { BottomSheet } from '../../BottomSheet'
import { H2 } from '@/components/atoms'

export function CenterMapOnPosition() {
  const { map } = useContext<MapContextContent>(MapContext)
  const { geolocation, setProjection } = useGeolocation()
  const [isAskPermissionBottomSheetOpen, setIsAskPermissionBottomSheetOpen] = useState(false)

  const canGeolocate = !!map && !!geolocation && !!geolocation.getPosition()

  useEffect(() => {
    if (!map) {
      return
    }

    setProjection(map.getView().getProjection())
  }, [map, setProjection])

  const centerMapOnPosition = () => {
    if (!geolocation) {
      return
    }

    if (!geolocation.getPosition()) {
      setIsAskPermissionBottomSheetOpen(true)
      return
    }

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
        onClick={centerMapOnPosition}
        disabled={canGeolocate}
      >
        <Location className="h-8 w-8" />
      </button>

      <BottomSheet
        isOpen={isAskPermissionBottomSheetOpen}
        onClick={() => setIsAskPermissionBottomSheetOpen(false)}
      >
        <H2>Vous devez autoriser la localisation</H2>
      </BottomSheet>
    </>
  )
}
