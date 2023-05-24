import React from "react";

import {Map} from 'ol';

export type MapContext = {
    map: Map | null
}

const MapContext = new React.createContext<MapContext>(null);

export default MapContext;