'use client';
import {Card} from "@/components/atoms/Card";
import Spinner from "@/components/atoms/Spinner";
import {H2} from "@/components/atoms/H2";
import {useGetRentsCompletedQuery} from "@/redux/services/cykleoApi";
import {Rent, RentResponse} from "@/types/cykleo/rent";
import RentSummary from "@/components/molecules/RentSummary";

export function RentCompleted() {
    const {isLoading, isFetching, data, error}: { data: RentResponse } = useGetRentsCompletedQuery(null);

    return (
        <Card>
            {isFetching || isLoading ? <Spinner/> : (
                <>
                    <H2>Location terminées</H2>
                    <ul className="flex flex-col gap-2">
                        {
                            data.content.map((rent: Rent) =>
                                <li key={rent.id}>
                                    <RentSummary rent={rent}/>
                                </li>
                            )
                        }
                    </ul>
                </>
            )}
        </Card>
    );
}