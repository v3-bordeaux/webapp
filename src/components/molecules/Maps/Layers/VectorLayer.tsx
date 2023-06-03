import { useContext, useEffect, useState } from 'react'
import OLVectorLayer from 'ol/layer/Vector'
import { Feature } from 'ol'

import MapContext, { MapContextContent } from '@/components/molecules/Maps/Map/MapContext'
import type VectorSource from 'ol/source/Vector'
import type { Geometry } from 'ol/geom'
import type { StyleLike } from 'ol/style/Style'
import type { FlatStyleLike } from 'ol/style/flat'

export interface VectorLayerProps {
  source: VectorSource<Geometry>
  style?: StyleLike | FlatStyleLike
  zIndex?: number
  onFeatureClick?: (feature: Feature) => void
}

export default function VectorLayer({
  source,
  style,
  zIndex = 0,
  onFeatureClick
}: VectorLayerProps) {
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

    map.on('click', function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature: Feature) {
        return feature
      })

      if (feature && onFeatureClick) {
        onFeatureClick(feature)
      }
    })

    return () => {
      if (map) {
        map.removeLayer(localVectorLayer)
      }
    }
  }, [map])

  if (!vectorLayer) {
    return null
  }

  vectorLayer.setSource(source)

  return null
}
