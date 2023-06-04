import { useContext, useEffect, useState } from 'react'
import OLVectorLayer from 'ol/layer/Vector'
import { Feature } from 'ol'

import MapContext, { MapContextContent } from '@/components/molecules/Maps/Map/MapContext'
import type VectorSource from 'ol/source/Vector'
import type { Geometry } from 'ol/geom'
import type { StyleLike } from 'ol/style/Style'
import type { FlatStyleLike } from 'ol/style/flat'
import { getCenter } from 'ol/extent'

export interface VectorLayerProps {
  source: VectorSource<Geometry>
  style?: StyleLike | FlatStyleLike
  zIndex?: number
  onFeatureClick?: (feature: Feature) => void
  onClusterFeatureClick?: (clusterFeature: Feature) => boolean
}

export default function VectorLayer({
  source,
  style,
  zIndex = 0,
  onFeatureClick,
  onClusterFeatureClick
}: VectorLayerProps) {
  const { map } = useContext<MapContextContent>(MapContext)
  const [vectorLayer, setVectorLayer] = useState(null)

  useEffect(() => {
    if (!map) return

    let localVectorLayer = new OLVectorLayer({
      source
    })

    map.addLayer(localVectorLayer)

    localVectorLayer.setZIndex(zIndex)

    setVectorLayer(localVectorLayer)

    function handleMapClick(evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature: Feature) {
        return feature
      })

      if (!feature) {
        return
      }

      if (feature.get('features') && onClusterFeatureClick) {
        const shouldZoomOnCluster = onClusterFeatureClick(feature)

        if (shouldZoomOnCluster) {
          const view = map.getView()
          view.adjustZoom(2)
          const center = getCenter(feature.getGeometry().getExtent())
          view.setCenter(center)
        }
      }

      if (onFeatureClick) {
        onFeatureClick(feature)
      }
    }
    map.on('click', handleMapClick)

    return () => {
      if (map) {
        map.removeEventListener('click', handleMapClick)
        map.removeLayer(localVectorLayer)
      }
    }
  }, [map])

  if (!vectorLayer) {
    return null
  }

  vectorLayer.setSource(source)
  vectorLayer.setStyle(style)

  return null
}
