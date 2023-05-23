'use client';
import {useAppSelector} from "@/redux/hooks";
import {RootState} from "@/redux/store";
import GlobalMap from "@/components/molecules/Maps/GlobalMap";
import {useState} from "react";

export type bikesOrPlaces = 'bikes' | 'places';

export default function Map() {
    const token = useAppSelector((state: RootState) => state.cykleoTokenReducer.value);
    const [showBikesOrPlaces, setShowBikesOrPlaces] = useState<bikesOrPlaces>('bikes');

    return (
        <main className="relative w-full">
            <GlobalMap showBikesOrPlaces={showBikesOrPlaces}/>

            <section className="bg-slate-200 absolute bottom-0 right-0 p-4">
                <button className={showBikesOrPlaces === 'bikes' ? 'bg-slate-400' : ''}
                        onClick={() => setShowBikesOrPlaces('bikes')}>Vélos
                </button>
                <button className={showBikesOrPlaces === 'places' ? 'bg-slate-400' : ''}
                        onClick={() => setShowBikesOrPlaces('places')}>Places
                </button>
            </section>
        </main>
    )
}