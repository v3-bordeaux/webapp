import {useContext, useEffect, useState} from "react";
import MapContext, {MapContextContent} from "@/components/molecules/Maps/Map/MapContext";
import VectorLayer from "@/components/molecules/Maps/Layers/VectorLayer";
import {Feature, Geolocation} from "ol";
import {vector} from "@/components/molecules/Maps/Source";
import {Point} from "ol/geom";
import {Fill, Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";

interface PositionLayerProps {
    zIndex?: number,
}

export default function PositionLayer({zIndex = 0}: PositionLayerProps) {
    const {map} = useContext<MapContextContent>(MapContext);

    const [features, setFeatures] = useState<Array<Feature>>([]);

    useEffect(()=>{
        if (!map) return;

        let geolocation = new Geolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: map.getView().getProjection(),
        })

        const localFeatures = [];
        const accuracyFeature = new Feature();
        geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        localFeatures.push(accuracyFeature)

        const positionFeature = new Feature();
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({
                        color: '#a3c5fe',
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2,
                    }),
                }),
            })
        );
        localFeatures.push(positionFeature)

        geolocation.on('change:position', function () {
            const coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        });

        geolocation.setTracking(true);

        setFeatures(localFeatures)
    }, [map]);

    return (<VectorLayer source={vector({features: features})} zIndex={zIndex}/>);
};