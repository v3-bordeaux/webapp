import React, { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import { Map as OlMap, View } from 'ol'
import { Coordinate } from 'ol/coordinate'

import MapContext from '@/components/molecules/Maps/Map/MapContext'

type MapProps = {
  children: ReactNode
  zoom: number
  center: Coordinate
} & HTMLAttributes<HTMLDivElement>

export default function Map({ children, zoom, center, className = '', ...props }: MapProps) {
  const mapRef = useRef()
  const [map, setMap] = useState<OlMap | null>(null)

  // on component mount
  useEffect(() => {
    let options = {
      view: new View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: []
    }
    let mapObject = new OlMap(options)
    mapObject.setTarget(mapRef.current)
    setMap(mapObject)
    return () => mapObject.setTarget(undefined)
  }, [])

  // zoom change handler
  useEffect(() => {
    if (!map) return
    map.getView().setZoom(zoom)
  }, [zoom])

  // center change handler
  useEffect(() => {
    if (!map) return
    map.getView().setCenter(center)
  }, [center])

  return (
    <MapContext.Provider value={{ map }}>
      <div
        ref={mapRef}
        className={`w-full aspect-video rounded-lg overflow-hidden ${className}`}
        {...props}
      >
        {children}
      </div>
    </MapContext.Provider>
  )
}
