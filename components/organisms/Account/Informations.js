'use client';
import {useAppSelector} from "@/redux/hooks";
import {Card} from "@/components/atoms/Card";
import {useEffect, useState} from "react";
import Spinner from "@/components/atoms/Spinner";

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
                    <h2>Informations</h2>
                    <span>Prénom: {informations.firstname}</span>
                    <span>Nom: {informations.lastname}</span>
                </>
            ) : <Spinner/>
            }
        </Card>
    );
}