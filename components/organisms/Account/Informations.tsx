'use client';
import { Card } from "@/components/atoms/Card";
import Spinner from "@/components/atoms/Spinner";
import { H2 } from "@/components/atoms/H2";
import { useGetAuthInformationsQuery, useGetSubscriptionsQuery } from "@/redux/services/cykleoApi";

export function Informations() {
    const authInformationsQuery = useGetAuthInformationsQuery(null);
    const subscriptionsQuery = useGetSubscriptionsQuery(null);
    return (
        <Card>
            {!subscriptionsQuery.data || !authInformationsQuery.data ? <Spinner /> : (
                <>
                    <H2>Informations</H2>
                    <span>Prénom: {authInformationsQuery.data.firstname}</span>
                    <span>Nom: {authInformationsQuery.data.lastname}</span>
                    <span>Crédit: {subscriptionsQuery.data.content[0].balance / 100}€</span>
                </>
            )}
        </Card>
    );
}