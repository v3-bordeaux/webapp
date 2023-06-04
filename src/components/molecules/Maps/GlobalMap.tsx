'use client'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Cluster } from 'ol/source'

import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'

import Map from '@/components/molecules/Maps/Map/Map'
import { osm, vector } from '@/components/molecules/Maps/Source'
import PositionLayer from '@/components/molecules/Maps/Layers/PositionLayer'
import { Layers, TileLayer, VectorLayer } from '@/components/molecules/Maps/Layers'
import { BikesOrPlaces, getClusteredStationStyle } from '@/components/molecules/Maps/Styles/Station'
import type { Station } from '@/_types/tbm/ws/station'

interface MapSize {
  height: number
  width: number
}

const bordeauxCoord = fromLonLat([-0.5795, 44.83])

interface GlobalMapProps extends PropsWithChildren {
  showBikesOrPlaces: BikesOrPlaces
  onClusterFeatureClick?: (feature: Feature) => boolean
}

export default function GlobalMap({
  showBikesOrPlaces,
  onClusterFeatureClick,
  children
}: GlobalMapProps) {
  const vcubsQuery = useGetVcubsQuery()

  const [center] = useState(bordeauxCoord)
  const [zoom] = useState(12)
  const [mapSize, setMapSize] = useState<MapSize>({ height: 0, width: 0 })

  function updateMapSize(window) {
    setMapSize({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  useEffect(() => {
    updateMapSize(window)

    window.addEventListener('resize', () => {
      updateMapSize(window)
    })
  }, [])

  let stationsFeatures = []

  if (vcubsQuery.data) {
    const stationsList = vcubsQuery.data.lists
    stationsFeatures = stationsList.map((station: Station) => {
      const stationCoord = fromLonLat([parseFloat(station.longitude), parseFloat(station.latitude)])

      let stationFeature = new Feature({
        geometry: new Point(stationCoord)
      })

      stationFeature.set('data', { station })

      return stationFeature
    })
  }

  const clusterSource = new Cluster({
    distance: 30,
    source: vector({ features: stationsFeatures })
  })

  return (
    <Map center={center} zoom={zoom} className="!aspect-auto" style={{ ...mapSize }}>
      <Layers>
        <TileLayer source={osm()} zIndex={0} />
        <VectorLayer
          source={clusterSource}
          style={getClusteredStationStyle(showBikesOrPlaces)}
          onClusterFeatureClick={onClusterFeatureClick}
        />
        <PositionLayer />
      </Layers>

      {children}
    </Map>
  )
}
