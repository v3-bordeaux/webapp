'use client';
import {useAppSelector} from "@/redux/hooks";
import Login from "@/components/organisms/Auth/Login";
import {Informations} from "@/components/organisms/Account/Informations";
import {RentInProgress} from "@/components/organisms/Account/RentInProgress";
import {H1} from "@/components/atoms/H1";
import Logout from "@/components/organisms/Auth/Logout";

export default function Home() {
    const token = useAppSelector((state) => state.cycleoTokenReducer.value);

    return (
        <main className="px-4">
            <H1 className="!my-10 text-center">V3 Bordeaux</H1>
            {token ? (
                <div className="flex flex-col gap-4">
                    <Informations/>
                    <RentInProgress/>
                    <Logout/>
                </div>
            ) : (
                <Login/>
            )}
        </main>
    )
}