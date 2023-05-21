import {Rent} from "@/types/cykleo/rent";
import dayjs from "dayjs";
import {useGetStationQuery} from "@/redux/services/cykleoApi";
import {Station as CykleoStation} from "@/types/cykleo/station";
import {useGetVcubsQuery} from "@/redux/services/tbmWSApi";
import {Station, VcubResponse} from "@/types/tbm/ws/station";
import {useEffect, useState} from "react";
import RentSummaryMap from "@/components/molecules/Maps/RentSummaryMap";

export default function RentSummary({rent}: { rent: Rent }) {
    const [stationStart, setStationStart]: [Station, Function] = useState(null);
    const [stationEnd, setStationEnd]: [Station, Function] = useState(null);

    const vcubsQuery: { data: VcubResponse } = useGetVcubsQuery();
    const stationStartQuery: { data: CykleoStation } = useGetStationQuery({
        stationId: rent.stationStart
    });
    const stationEndQuery: { data: CykleoStation } = useGetStationQuery({
        stationId: rent.stationEnd
    });

    useEffect(() => {
        if (!vcubsQuery.data || !stationStartQuery.data) {
            return
        }

        let stationName = stationStartQuery.data.assetStation.commercialName.toLowerCase();
        let stationFound = vcubsQuery.data.lists.find(station => {
            return station.name.toLowerCase() === stationName
        })

        if (stationFound) {
            setStationStart(stationFound)
        }
    }, [vcubsQuery, stationStartQuery]);

    useEffect(() => {
        if (!vcubsQuery.data || !stationEndQuery.data) {
            return
        }

        let stationName = stationEndQuery.data.assetStation.commercialName.toLowerCase();
        let stationFound = vcubsQuery.data.lists.find(station => {
            return station.name.toLowerCase() === stationName
        })

        if (stationFound) {
            setStationEnd(stationFound)
        }
    }, [vcubsQuery, stationEndQuery]);

    const beginDateParsed = dayjs(rent.beginDate)
    const endDateParsed = dayjs(rent.endDate)
    const duration = endDateParsed.diff(beginDateParsed, 'm');
    return (
        <article className="bg-slate-200 rounded-md p-3 flex flex-col">
            <RentSummaryMap/>
            <span>Durée: {duration} minute(s)</span>
            <span>Du {beginDateParsed.format('DD/MM/YYYY à HH[h]mm')} au {endDateParsed.format('DD/MM/YYYY à HH[h]mm')}</span>
            <span>De {stationStart?.name} à {stationEnd?.name}</span>
        </article>
    );
}