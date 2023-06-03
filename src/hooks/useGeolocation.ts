import { useEffect, useState } from 'react'
import { Geolocation } from 'ol'
import { Projection } from 'ol/proj'

export function useGeolocation() {
  const [projection, setProjection] = useState<Projection>(null)
  const [geolocation, setGeolocation] = useState<Geolocation>(null)

  useEffect(() => {
    let geoloc = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection
    })

    geoloc.setTracking(true)

    setGeolocation(geoloc)
  }, [projection])

  return {
    projection,
    setProjection,
    geolocation
  }
}
