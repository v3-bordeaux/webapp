'use client';
import {useAppSelector} from "@/redux/hooks";
import {Card} from "@/components/atoms/Card";
import {useEffect, useState} from "react";
import Spinner from "@/components/atoms/Spinner";
import {H2} from "@/components/atoms/H2";

export function RentInProgress() {
    const token = useAppSelector((state) => state.cycleoTokenReducer.value);

    const [rent, setRent] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/cycleo/pu/rents/in_progress?size=1&sort=beginDate,DESC&version=2", {
                credentials: 'include',
            });

            const json = await response.json()

            console.log(json)
            setRent(json);
        }

        fetchData()
    }, [])

    return (
        <Card>
            {rent ? (
                <>
                    <H2>Location en cours</H2>
                    {rent.totalElements === 0 && (
                        <span>Pas de location en cours</span>
                    )}
                    {rent.totalElements === 1 && (
                        <span>Location en cours</span>
                    )}
                </>
            ) : <Spinner/>
            }
        </Card>
    );
}