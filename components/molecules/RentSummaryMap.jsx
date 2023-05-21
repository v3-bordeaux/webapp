import Map from "@/components/molecules/Map/Map";
import {Layers, TileLayer} from "@/components/molecules/Layers";
import {osm} from "@/components/molecules/Source";
import {fromLonLat} from 'ol/proj';
import {useState} from "react";

export default function RentSummaryMap() {
    const [center, setCenter] = useState([-94.9065, 38.9884]);
    const [zoom, setZoom] = useState(9);

    return (
        <Map center={fromLonLat(center)} zoom={zoom}>
            <Layers>
                <TileLayer
                    source={osm()}
                    zIndex={0}
                />
            </Layers>
        </Map>
    );
}