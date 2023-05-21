'use client';
import {Card} from "@/components/atoms/Card";
import Spinner from "@/components/atoms/Spinner";
import {H2} from "@/components/atoms/H2";
import {useGetRentsInProgressQuery} from "@/redux/services/cycleoApi";

export function RentInProgress() {
    const {isLoading, isFetching, data, error} = useGetRentsInProgressQuery(null);

    return (
        <Card>
            {isFetching || isLoading ? <Spinner/> : (
                <>
                    <H2>Location en cours</H2>
                    {data.totalElements === 0 ? (
                        <span>Pas de location en cours</span>
                    ) : (
                        <span>Location en cours</span>
                    )}
                </>
            )}
        </Card>
    );
}