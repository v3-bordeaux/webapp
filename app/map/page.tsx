'use client';
import {useAppSelector} from "@/redux/hooks";
import {RootState} from "@/redux/store";
import GlobalMap from "@/components/molecules/Maps/GlobalMap";

export default function Map() {
    const token = useAppSelector((state: RootState) => state.cykleoTokenReducer.value);

    return (
        <main>
            <GlobalMap/>
        </main>
    )
}