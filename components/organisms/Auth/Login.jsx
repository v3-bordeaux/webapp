'use client';
import {useState} from "react";
import {useAppDispatch} from "@/redux/hooks";
import {setToken} from "@/redux/features/cycleoTokenSlice";
import {Input} from "@/components/atoms/Input";
import {Button} from "@/components/atoms/Button";
import {Card} from "@/components/atoms/Card";

export default function Login() {
    const loginUrl = "/cycleo/pu/auth";
    const [username, setUsername] = useState(process.env.NEXT_PUBLIC_CYCLEO_USERNAME || null);
    const [password, setPassword] = useState(process.env.NEXT_PUBLIC_CYCLEO_PASSWORD || null);
    const dispatch = useAppDispatch();

    async function sendLogin() {
        try {

            const response = await fetch(loginUrl, {
                method: "POST",
                cache: 'no-store',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    organizationId: 7,
                    password,
                    username,
                }),
            });

            const json = await response.json()

            dispatch(setToken(json.access_token))
        } catch (e) {
            alert('Une erreur est survenue');
            console.error(e);
        }
    }

    return (
        <Card>
            <form className="flex flex-col">
                <label htmlFor="email">E-mail</label>
                <Input className="mt-2" autoFocus type="text" id="email" name="email" required value={username || ''}
                       onChange={e => setUsername(e.target.value)}/>

                <label className="mt-6" htmlFor="password">Mot de passe</label>
                <Input className="mt-2" type="password" id="password" name="password" required value={password || ''}
                       onChange={e => setPassword(e.target.value)}/>

                <Button className="mt-6" onClick={sendLogin}>Se connecter</Button>
            </form>
        </Card>
    )
}
