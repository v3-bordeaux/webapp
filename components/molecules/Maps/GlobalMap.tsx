import Map from "@/components/molecules/Maps/Map/Map";
import {Layers, TileLayer, VectorLayer} from "@/components/molecules/Maps/Layers";
import {osm, vector} from "@/components/molecules/Maps/Source";
import {fromLonLat} from 'ol/proj';
import {useEffect, useState} from "react";
import {Circle, Fill, Stroke, Style, Text} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {useGetVcubsQuery} from "@/redux/services/tbmWSApi";
import {Station} from "@/types/tbm/ws/station";

const circleStyle = new Circle({
    radius: 20,
    fill: new Fill({
        color: '#aecaf1'
    }),
    stroke: new Stroke({
        color: '#000'
    })
})

const stationStyle = (station: Station) => {
    let bgColor = '#a3c5fe';
    if (station.nbBikeAvailable === 0) {
        bgColor = '#ffa1a1';
    } else if (station.nbBikeAvailable < 5) {
        bgColor = '#ffd0a1';
    }
    return new Style({
        text: new Text({
            font: 'bold 12px sans-serif',
            text: station.nbBikeAvailable.toString(),
        }),
        image: new Circle({
            radius: 15,
            fill: new Fill({
                color: bgColor
            }),
            stroke: new Stroke({
                color: '#000'
            })
        }),
    })
}

type GlobalMapProps = {}

const GEOGRAPHIC_PROJ = "EPSG:4326";
const MERCATOR_PROJ = "EPSG:3857";
const bordeauxCoord = fromLonLat([-0.5795, 44.830]);

export default function GlobalMap() {
    const vcubsQuery = useGetVcubsQuery();

    const [center, setCenter] = useState(bordeauxCoord);
    const [zoom, setZoom] = useState(12);
    const [stationsFeatures, setStationsFeatures] = useState(null);

    useEffect(() => {
        if (vcubsQuery.data) {
            const stationsList = vcubsQuery.data.lists;
            setStationsFeatures(stationsList.map((station: Station) => {
                const stationCoord = fromLonLat([parseFloat(station.longitude), parseFloat(station.latitude)]);

                let stationFeature = new Feature({
                    geometry: new Point(stationCoord),
                });
                stationFeature.setStyle(stationStyle(station));
                return stationFeature
            }))
        }
    }, [vcubsQuery])

    return (
        <Map center={center} zoom={zoom}>
            <Layers>
                <TileLayer
                    source={osm()}
                    zIndex={0}
                />
                <VectorLayer source={vector({features: stationsFeatures})}/>
            </Layers>
        </Map>
    );
}