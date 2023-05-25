import { useContext, useEffect, useState } from 'react'
import OLVectorLayer from 'ol/layer/Vector'

import MapContext, {MapContextContent} from "@/components/molecules/Maps/Map/MapContext";

export default function VectorLayer({ source, style = null, zIndex = 0 }) {
  const { map } = useContext<MapContextContent>(MapContext)
  const [vectorLayer, setVectorLayer] = useState(null)

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
  useEffect(() => {
    if (!vectorLayer) {
      return
    }

    vectorLayer.setSource(source)
  }, [source])
  return null
}
