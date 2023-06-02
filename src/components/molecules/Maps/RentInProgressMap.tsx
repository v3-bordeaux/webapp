import React, { useState } from 'react'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Circle, Fill, Stroke, Style, Text } from 'ol/style'

import Map from '@/components/molecules/Maps/Map/Map'
import { osm, vector } from '@/components/molecules/Maps/Source'
import { Layers, TileLayer, VectorLayer } from '@/components/molecules/Maps/Layers'

import type { Station } from '@/_types/tbm/ws/station'
import PositionLayer from './Layers/PositionLayer'

const circleStyle = new Circle({
  radius: 20,
  fill: new Fill({
    color: '#aecaf1'
  }),
  stroke: new Stroke({
    color: '#000'
  })
})

interface RentInProgressMapProps {
  stationStart: Station
}

export default function RentInProgressMap({ stationStart }: RentInProgressMapProps) {
  const stationStartCoord = fromLonLat([
    parseFloat(stationStart.longitude),
    parseFloat(stationStart.latitude)
  ])

  const [center, setCenter] = useState(stationStartCoord)
  const [zoom, setZoom] = useState(12)

  const startFeature = new Feature({
    geometry: new Point(stationStartCoord)
  })
  startFeature.setStyle(
    new Style({
      text: new Text({
        text: 'Départ'
      }),
      image: circleStyle
    })
  )

  const pointFeatures = [startFeature]

  return (
    <Map center={center} zoom={zoom}>
      <Layers>
        <TileLayer source={osm()} zIndex={0} />
        <VectorLayer source={vector({ features: pointFeatures })} />
        <PositionLayer />
      </Layers>
    </Map>
  )
}
