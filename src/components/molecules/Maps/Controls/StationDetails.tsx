import {useContext, useEffect, useState} from "react";
import MapContext, {MapContextContent} from "@/components/molecules/Maps/Map/MapContext";
import { Feature } from "ol";
import type { Station } from '@/_types/tbm/ws/station'

export function StationDetails() {
    const {map} = useContext<MapContextContent>(MapContext);
    const [station, setStation] = useState<Station>(null);

    useEffect(()=>{
        if(!map) {
            return;
        }

        map.on('click', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature: Feature) {
              return feature
            })
        
            if (feature.get('name')) {
              feature.get('name')
            }
        
            setStation(feature.get('data').station);
        })
    }, [map])

    const closeBottomSheet = ()=>{
        setStation(null);
    }


    return !station ? null : (
        <section className="z-50 fixed bottom-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-backdrop-1/50" onClick={closeBottomSheet}></div>
            <section className="z-50 rounded-t-2xl fixed bottom-0 left-0 w-full h-2/3 bg-background-3">

            </section>
        </section>
    );
}