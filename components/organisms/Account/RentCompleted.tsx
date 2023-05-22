'use client';
import {Card} from "@/components/atoms/Card";
import Spinner from "@/components/atoms/Spinner";
import {H2} from "@/components/atoms/H2";
import {useGetRentsCompletedQuery} from "@/redux/services/cykleoApi";
import {Rent} from "@/types/cykleo/rent";
import RentCompletedCard from "@/components/molecules/RentCompletedCard";

export function RentCompleted() {
    const {isLoading, isFetching, data, error} = useGetRentsCompletedQuery(null);

    return (
        <Card>
            {isFetching || isLoading ? <Spinner/> : (
                <>
                    <H2>Location terminées</H2>
                    <ul className="flex flex-col gap-2">
                        {
                            data.content.map((rent: Rent) =>
                                <li key={rent.id}>
                                    <RentCompletedCard rent={rent}/>
                                </li>
                            )
                        }
                    </ul>
                </>
            )}
        </Card>
    );
}