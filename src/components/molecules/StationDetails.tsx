import { createPortal } from 'react-dom';
import { H2 } from "@/components/atoms";
import { Bicycle, ProductHuntFill } from "akar-icons";

import type { Station } from '@/_types/tbm/ws/station'

export interface StationDetailsProps {
    station: Station,
    onClose: () => void
}

export function StationDetails({station, onClose}: StationDetailsProps) {
    return station && createPortal(
        <section className="z-50 fixed bottom-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-backdrop-2/50" onClick={onClose}></div>

            <article className="z-50 container py-4 rounded-t-2xl fixed bottom-0 left-0 w-full h-2/3 bg-background-3">
                <H2 className="mb-4">{station.name}</H2>

                <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                        <Bicycle className="h-8 w-8"/>
                        <span>{station.nbBikeAvailable}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Bicycle className="h-8 w-8"/>
                        <span>{station.nbElectricBikeAvailable}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <ProductHuntFill className="h-8 w-8"/>
                        <span>{station.nbPlaceAvailable}</span>
                    </div>
                </div>
            </article>
        </section>
    , document.body);
}