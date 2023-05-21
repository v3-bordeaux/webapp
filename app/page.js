'use client';
import {useAppSelector} from "@/redux/hooks";
import Login from "@/components/organisms/Auth/Login";
import {Informations} from "@/components/organisms/Account/Informations";

export default function Home() {
    const token = useAppSelector((state) => state.cycleoTokenReducer.value);

    return (
        <main className="px-4">
            <h3>V3 Bordeaux</h3>
            {token ? (
                <div>
                    <Informations/>
                </div>
            ) : (
                <Login/>
            )}
        </main>
    )
}