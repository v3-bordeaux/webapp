'use client';
import {useAppSelector} from "@/redux/hooks";
import {H1} from "@/components/atoms/H1";
import {RootState} from "@/redux/store";
import GlobalMap from "@/components/molecules/Maps/GlobalMap";

export default function Map() {
    const token = useAppSelector((state: RootState) => state.cykleoTokenReducer.value);

    return (
        <main className="px-4">
            <H1 className="!my-10 text-center">V3 Bordeaux</H1>
            <GlobalMap/>
        </main>
    )
}