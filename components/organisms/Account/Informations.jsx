'use client';
import {useAppSelector} from "@/redux/hooks";
import {Card} from "@/components/atoms/Card";
import {useEffect, useState} from "react";
import Spinner from "@/components/atoms/Spinner";
import {H2} from "@/components/atoms/H2";

export function Informations() {
    const token = useAppSelector((state) => state.cycleoTokenReducer.value);

    const [informations, setInformations] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/cycleo/pu/auth", {
                credentials: 'include',
            });

            const json = await response.json()

            console.log(json)
            setInformations(json);
        }

        fetchData()
    }, [])

    return (
        <Card>
            {informations ? (
                <>
                    <H2>Informations</H2>
                    <span>Prénom: {informations.firstname}</span>
                    <span>Nom: {informations.lastname}</span>
                </>
            ) : <Spinner/>
            }
        </Card>
    );
}