import Map from "@/components/molecules/Maps/Map/Map";
import {Layers, TileLayer, VectorLayer} from "@/components/molecules/Maps/Layers";
import {osm, vector} from "@/components/molecules/Maps/Source";
import {fromLonLat} from 'ol/proj';
import {useState} from "react";
import {Station} from "@/types/tbm/ws/station";
import {Circle, Fill, Stroke, Style, Text} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";

const circleStyle = new Circle({
    radius: 20,
    fill: new Fill({
        color: '#aecaf1'
    }),
    stroke: new Stroke({
        color: '#000'
    })
})

const stationsCircleStyle = new Circle({
    radius: 5,
    fill: new Fill({
        color: '#3f86ed'
    }),
    stroke: new Stroke({
        color: '#000'
    })
})

type RentInProgressMapProps = {
    stationStart: Station,
    stations: Station[]
}

export default function RentInProgressMap({stationStart, stations}: RentInProgressMapProps) {
    const stationStartCoord = fromLonLat([parseFloat(stationStart.longitude), parseFloat(stationStart.latitude)]);

    const [center, setCenter] = useState(stationStartCoord);
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

    const stationsFeatures = stations.map(station => {
        const stationCoord = fromLonLat([parseFloat(station.longitude), parseFloat(station.latitude)]);

        let stationFeature = new Feature({
            geometry: new Point(stationCoord),
        });
        stationFeature.setStyle(new Style({
            text: new Text({
                text: station.name,
                offsetY: -12
            }),
            image: stationsCircleStyle,
        }));
        return stationFeature
    })

    const pointFeatures = [
        startFeature,
    ];

    return (
        <Map center={center} zoom={zoom}>
            <Layers>
                <TileLayer
                    source={osm()}
                    zIndex={0}
                />
                <VectorLayer source={vector({features: stationsFeatures})}/>
                <VectorLayer source={vector({features: pointFeatures})}/>
            </Layers>
        </Map>
    );
}