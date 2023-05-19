'use client';
import { useState } from "react";

export default function Login() {
    const loginUrl = "/cycleo/pu/auth";
    const [username, setUsername] = useState(process.env.NEXT_PUBLIC_CYCLEO_USERNAME);
    const [password, setPassword] = useState(process.env.NEXT_PUBLIC_CYCLEO_PASSWORD);

    async function sendLogin() {
        console.log(username, password);

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

        console.log(await response.json());
    }



    return (
        <main className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <input autoFocus type="text" name="email" required value={username} onChange={e => setUsername(e.target.value)}></input>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
            <button type="button" className="bg-green-400 p-2" onClick={sendLogin}>Se connecter</button>
        </main>
    )
}
