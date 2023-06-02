import { useContext, useEffect, useState } from 'react'
import OLVectorLayer from 'ol/layer/Vector'

import MapContext, { MapContextContent } from '@/components/molecules/Maps/Map/MapContext'

import useUxSettings from '@/hooks/useUxSettings'

export default function VectorLayer({ source, style = null, zIndex = 0 }) {
  const { map } = useContext<MapContextContent>(MapContext)
  const [vectorLayer, setVectorLayer] = useState(null)
  const { uxSettings, setUxSettings } = useUxSettings()

  useEffect(() => {
    if (!map) return
    let localVectorLayer = new OLVectorLayer({
      source,
      style
    })
    map.addLayer(localVectorLayer)
    localVectorLayer.setZIndex(zIndex)

    setVectorLayer(localVectorLayer)

    return () => {
      if (map) {
        map.removeLayer(localVectorLayer)
      }
    }
  }, [map])

  // update layer when source change

  if (!map) return null

  map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature
    })

    if (feature.get('name')) {
      feature.get('name')
    }
  })

  if (!vectorLayer) {
    return null
  }

  vectorLayer.setSource(source)

  return null
}
