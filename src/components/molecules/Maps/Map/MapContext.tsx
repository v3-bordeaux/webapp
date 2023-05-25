import React from 'react'
import { Map } from 'ol'

export type MapContextContent = {
  map: Map | null
}

const MapContext = React.createContext<MapContextContent>(null)

export default MapContext
