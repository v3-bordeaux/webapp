import {Rent} from "@/types/rent";
import dayjs from "dayjs";

export default function RentSummary({rent}: { rent: Rent }) {

    const beginDateParsed = dayjs(rent.beginDate)
    const endDateParsed = dayjs(rent.endDate)
    const duration = endDateParsed.diff(beginDateParsed, 'm');
    return (
        <article className="bg-slate-200 rounded-md p-3 flex flex-col">
            <span>Durée: {duration} minute(s)</span>
            <span>Du {beginDateParsed.format('DD/MM/YYYY à HH[h]mm')} au {endDateParsed.format('DD/MM/YYYY à HH[h]mm')}</span>
        </article>
    );
}