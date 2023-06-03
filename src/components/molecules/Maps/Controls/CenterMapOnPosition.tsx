import { useContext, useEffect } from 'react'
import MapContext, { MapContextContent } from '@/components/molecules/Maps/Map/MapContext'
import { Location } from '@v3-bordeaux/akar-icons'
import { useGeolocation } from '@/hooks/useGeolocation'

export function CenterMapOnPosition() {
  const { map } = useContext<MapContextContent>(MapContext)
  const { geolocation, setProjection } = useGeolocation()

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

    map.getView().setCenter(geolocation.getPosition())
  }

  return (
    <button
      className="pointer-events-auto rounded-full p-3 bg-cta-1 border-2 border-text-1 shadow-brut active:shadow-none active:translate-x-1 active:translate-y-1"
      onClick={centerMapOnPosition}
      disabled={!map || !geolocation}
    >
      <Location className="h-8 w-8" />
    </button>
  )
}
