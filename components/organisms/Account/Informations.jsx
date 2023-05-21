'use client';
import {Card} from "@/components/atoms/Card";
import Spinner from "@/components/atoms/Spinner";
import {H2} from "@/components/atoms/H2";
import {useGetAuthInformationsQuery} from "@/redux/services/cykleoApi";

export function Informations() {
    const {isLoading, isFetching, data, error} = useGetAuthInformationsQuery(null);

    return (
        <Card>
            {isFetching || isLoading ? <Spinner/> : (
                <>
                    <H2>Informations</H2>
                    <span>Prénom: {data.firstname}</span>
                    <span>Nom: {data.lastname}</span>
                </>
            )}
        </Card>
    );
}