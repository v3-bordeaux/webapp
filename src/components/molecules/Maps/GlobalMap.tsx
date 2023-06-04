'use client'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Circle, Fill, Stroke, Style, Text } from 'ol/style'
import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'

import Map from '@/components/molecules/Maps/Map/Map'
import { osm, vector } from '@/components/molecules/Maps/Source'
import PositionLayer from '@/components/molecules/Maps/Layers/PositionLayer'
import { Layers, TileLayer, VectorLayer } from '@/components/molecules/Maps/Layers'

import type { Station } from '@/_types/tbm/ws/station'
import { Cluster } from 'ol/source'

export type BikesOrPlaces = 'bikes' | 'places'

const themeForBikesOrPlaces = {
  bikes: {
    getNb: (station: Station) => station?.nbBikeAvailable + station?.nbElectricBikeAvailable,
    getBgColor: (nb: number) => {
      if (nb === 0) {
        return '#ffa1a1'
      }
      if (nb < 5) {
        return '#ffd0a1'
      }
      return '#a3c5fe'
    }
  },
  places: {
    getNb: (station: Station) => station?.nbPlaceAvailable,
    getBgColor: (nb: number) => {
      if (nb === 0) {
        return '#ffa1a1'
      }
      if (nb < 5) {
        return '#ffd0a1'
      }
      return '#a3c5fe'
    }
  }
}

const stationStyle = ({ text, bgColor }: { text: string; bgColor: string }) =>
  new Style({
    text: new Text({
      font: 'bold 12px sans-serif',
      text: text
    }),
    image: new Circle({
      radius: 15,
      fill: new Fill({
        color: bgColor
      }),
      stroke: new Stroke({
        color: '#000'
      })
    })
  })

const getClusteredStationStyle = (showBikesOrPlaces) => (feature: Feature) => {
  const theme = themeForBikesOrPlaces[showBikesOrPlaces]

  const features: Array<Feature> | null = feature.get('features')
  let nb = 0

  if (features?.length) {
    const stationsList: Array<Station> = features.map((feature) => feature.get('data')?.station)

    nb = stationsList.reduce((_nb, station) => _nb + theme.getNb(station), 0)
  } else {
    const station: Station = feature.get('data')?.station

    nb = theme.getNb(station)
  }

  return stationStyle({
    text: nb.toString(),
    bgColor: theme.getBgColor(nb)
  })
}

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

  const vectorStyle = getClusteredStationStyle(showBikesOrPlaces)

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
          style={vectorStyle}
          onClusterFeatureClick={onClusterFeatureClick}
        />
        <PositionLayer />
      </Layers>

      {children}
    </Map>
  )
}
