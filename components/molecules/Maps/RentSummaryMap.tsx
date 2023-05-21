import Map from "@/components/molecules/Maps/Map/Map";
import {Layers, TileLayer, VectorLayer} from "@/components/molecules/Maps/Layers";
import {osm, vector} from "@/components/molecules/Maps/Source";
import {fromLonLat} from 'ol/proj';
import {useState} from "react";
import {Station} from "@/types/tbm/ws/station";
import {Circle, Fill, Style} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";

// const GEOGRAPHIC_PROJ = "EPSG:4326";
// const MERCATOR_PROJ = "EPSG:3857";
// const bordeauxCoord = fromLonLat(transform([-0.5795, 44.7779], GEOGRAPHIC_PROJ, MERCATOR_PROJ));

function addMarkers(markersArray) {
    const iconStyle = new Style({
        image: new Circle({
            radius: 10,
            fill: new Fill({
                color: 'black'
            })
        }),
    });

    return markersArray.map((lonLatItem) => {
        let feature = new Feature({
            geometry: new Point(lonLatItem),
        });
        feature.setStyle(iconStyle);
        return feature;
    });
}

export default function RentSummaryMap({stationStart, stationEnd}: { stationStart: Station, stationEnd: Station }) {
    const stationStartCoord = fromLonLat([parseFloat(stationStart.longitude), parseFloat(stationStart.latitude)]);
    const stationEndCoord = fromLonLat([parseFloat(stationEnd.longitude), parseFloat(stationEnd.latitude)]);

    const [center, setCenter] = useState(stationStartCoord);
    const [zoom, setZoom] = useState(12);

    const features = addMarkers([
        stationStartCoord,
        stationEndCoord,
    ])

    return (
        <Map center={center} zoom={zoom}>
            <Layers>
                <TileLayer
                    source={osm()}
                    zIndex={0}
                />
                <VectorLayer source={vector({features})}/>
            </Layers>
        </Map>
    );
}