'use client';
import {useState} from "react";
import {useAppDispatch} from "@/redux/hooks";
import {setToken} from "@/redux/features/cycleoTokenSlice";

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
        <form className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <input autoFocus type="text" name="email" required value={username || ''}
                   onChange={e => setUsername(e.target.value)}></input>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" required value={password || ''}
                   onChange={e => setPassword(e.target.value)}></input>
            <button type="button" className="bg-green-400 p-2" onClick={sendLogin}>Se connecter</button>
        </form>
    )
}
