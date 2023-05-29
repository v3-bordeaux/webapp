'use client'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { latLng } from 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Circle, Fill, Stroke, Style, Text } from 'ol/style'
import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'

import { type LatLngExpression } from 'leaflet';
import type { Station } from '@/_types/tbm/ws/station'


export type bikesOrPlaces = 'bikes' | 'places'

const stationPlacesStyle = (station: Station) => {
  const nbPlaces = station.nbPlaceAvailable
  let bgColor = '#a3c5fe'
  if (nbPlaces === 0) {
    bgColor = '#ffa1a1'
  } else if (nbPlaces < 5) {
    bgColor = '#ffd0a1'
  }
  return new Style({
    text: new Text({
      font: 'bold 12px sans-serif',
      text: nbPlaces.toString()
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
}

const stationBikesStyle = (station: Station) => {
  const nbBikes = station.nbBikeAvailable + station.nbElectricBikeAvailable

  let bgColor = '#a3c5fe'
  if (nbBikes === 0) {
    bgColor = '#ffa1a1'
  } else if (nbBikes < 5) {
    bgColor = '#ffd0a1'
  }
  return new Style({
    text: new Text({
      font: 'bold 12px sans-serif',
      text: nbBikes.toString()
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
}

interface GlobalMapProps {
  showBikesOrPlaces: bikesOrPlaces
}

interface MapSize {
  height: number
  width: number
}

const bordeauxCoord = latLng(44.83, -0.5795);

export default function GlobalMap({ showBikesOrPlaces }: GlobalMapProps) {
  const vcubsQuery = useGetVcubsQuery()

  const [center, setCenter] = useState<LatLngExpression>(bordeauxCoord)
  const [zoom, setZoom] = useState(12)
  const [stationsFeatures, setStationsFeatures] = useState(null)
  const [mapSize, setMapSize] = useState<MapSize>({height: 0, width: 0})

  function updateMapSize(window) {
    setMapSize({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  useEffect(()=>{
    if(!window) {
      return;
    }

    updateMapSize(window)

    window.addEventListener('resize', ()=>{
      updateMapSize(window)
    })
  }, []);

  useEffect(() => {
    if (vcubsQuery.data) {
      const stationsList = vcubsQuery.data.lists
      setStationsFeatures(
        stationsList.map((station: Station) => {
          const stationCoord = fromLonLat([
            parseFloat(station.longitude),
            parseFloat(station.latitude)
          ])

          let stationFeature = new Feature({
            geometry: new Point(stationCoord)
          })

          if (showBikesOrPlaces === 'bikes') {
            stationFeature.setStyle(stationBikesStyle(station))
          } else {
            stationFeature.setStyle(stationPlacesStyle(station))
          }

          return stationFeature
        })
      )
    }
  }, [vcubsQuery, showBikesOrPlaces])

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={center}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  )
}
