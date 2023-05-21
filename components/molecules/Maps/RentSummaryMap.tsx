import Map from "@/components/molecules/Maps/Map/Map";
import {Layers, TileLayer, VectorLayer} from "@/components/molecules/Maps/Layers";
import {osm, vector} from "@/components/molecules/Maps/Source";
import {fromLonLat} from 'ol/proj';
import {useState} from "react";
import {Station} from "@/types/tbm/ws/station";
import {Circle, Fill, Stroke, Style, Text} from "ol/style";
import {Feature} from "ol";
import {LineString, Point} from "ol/geom";

// const GEOGRAPHIC_PROJ = "EPSG:4326";
// const MERCATOR_PROJ = "EPSG:3857";
// const bordeauxCoord = fromLonLat(transform([-0.5795, 44.7779], GEOGRAPHIC_PROJ, MERCATOR_PROJ));

const circleStyle = new Circle({
    radius: 20,
    fill: new Fill({
        color: '#aecaf1'
    }),
    stroke: new Stroke({
        color: '#000'
    })
})

export default function RentSummaryMap({stationStart, stationEnd}: { stationStart: Station, stationEnd: Station }) {
    const stationStartCoord = fromLonLat([parseFloat(stationStart.longitude), parseFloat(stationStart.latitude)]);
    const stationEndCoord = fromLonLat([parseFloat(stationEnd.longitude), parseFloat(stationEnd.latitude)]);

    const [center, setCenter] = useState(stationEndCoord);
    const [zoom, setZoom] = useState(12);

    const startFeature = new Feature({
        geometry: new Point(stationStartCoord),
    });
    startFeature.setStyle(new Style({
        text: new Text({
            text: 'Départ',
        }),
        image: circleStyle,
    }));

    const endFeature = new Feature({
        geometry: new Point(stationEndCoord),
    });
    endFeature.setStyle(new Style({
        text: new Text({
            text: 'Arrivée',
        }),
        image: circleStyle,
    }));


    const pointFeatures = [
        startFeature,
        endFeature
    ];

    const lineFeature = new Feature({
        geometry: new LineString([stationStartCoord, stationEndCoord])
    });

    lineFeature.setStyle(new Style({
        stroke: new Stroke({
            color: '#000',
            width: 4,
            lineDash: [10, 10],
        })
    }));

    return (
        <Map center={center} zoom={zoom}>
            <Layers>
                <TileLayer
                    source={osm()}
                    zIndex={0}
                />
                <VectorLayer source={vector({features: [lineFeature]})}/>
                <VectorLayer source={vector({features: pointFeatures})}/>
            </Layers>
        </Map>
    );
}