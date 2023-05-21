import Map from "@/components/molecules/Maps/Map/Map";
import {Layers, TileLayer} from "@/components/molecules/Maps/Layers";
import {osm} from "@/components/molecules/Maps/Source";
import {fromLonLat} from 'ol/proj';
import {useState} from "react";
import {Station} from "@/types/tbm/ws/station";

// const GEOGRAPHIC_PROJ = "EPSG:4326";
// const MERCATOR_PROJ = "EPSG:3857";
// const bordeauxCoord = fromLonLat(transform([-0.5795, 44.7779], GEOGRAPHIC_PROJ, MERCATOR_PROJ));
const bordeauxCoord = fromLonLat([-0.5795, 44.7779]);

export default function RentSummaryMap({stationStart, stationEnd}: { stationStart: Station, stationEnd: Station }) {
    const stationStartCoord = fromLonLat([parseFloat(stationStart.longitude), parseFloat(stationStart.latitude)]);
    const [center, setCenter] = useState(stationStartCoord);
    const [zoom, setZoom] = useState(14);

    return (
        <Map center={center} zoom={zoom}>
            <Layers>
                <TileLayer
                    source={osm()}
                    zIndex={0}
                />
            </Layers>
        </Map>
    );
}