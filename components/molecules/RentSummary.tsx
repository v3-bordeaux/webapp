import {Rent} from "@/types/cykleo/rent";
import dayjs from "dayjs";
import {useGetStationQuery} from "@/redux/services/cykleoApi";
import {Station} from "@/types/cykleo/station";

export default function RentSummary({rent}: { rent: Rent }) {
    const stationStart: { data: Station } = useGetStationQuery({
        stationId: rent.stationStart
    });

    const stationEnd: { data: Station } = useGetStationQuery({
        stationId: rent.stationEnd
    });

    const beginDateParsed = dayjs(rent.beginDate)
    const endDateParsed = dayjs(rent.endDate)
    const duration = endDateParsed.diff(beginDateParsed, 'm');
    return (
        <article className="bg-slate-200 rounded-md p-3 flex flex-col">
            <span>Durée: {duration} minute(s)</span>
            <span>Du {beginDateParsed.format('DD/MM/YYYY à HH[h]mm')} au {endDateParsed.format('DD/MM/YYYY à HH[h]mm')}</span>
            <span>{stationStart?.data?.assetStation.commercialName} à {stationEnd?.data?.assetStation.commercialName}</span>
        </article>
    );
}