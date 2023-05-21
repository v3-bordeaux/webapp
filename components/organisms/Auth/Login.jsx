'use client';
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/redux/hooks";
import {Input} from "@/components/atoms/Input";
import {Button} from "@/components/atoms/Button";
import {Card} from "@/components/atoms/Card";
import {useLoginMutation} from "@/redux/services/cycleoApi";
import {setToken} from "@/redux/features/cycleoTokenSlice";

export default function Login() {
    const [username, setUsername] = useState(process.env.NEXT_PUBLIC_CYCLEO_USERNAME || null);
    const [password, setPassword] = useState(process.env.NEXT_PUBLIC_CYCLEO_PASSWORD || null);
    const [login, loginResponse] = useLoginMutation();

    const dispatch = useAppDispatch();

    async function sendLogin() {
        try {
            login({
                password,
                username
            }).unwrap()
        } catch (e) {
            alert('Une erreur est survenue');
            console.error(e);
        }
    }

    useEffect(() => {
        if (loginResponse.status === "fulfilled") {
            dispatch(setToken(loginResponse.data.access_token))
        }
    }, [loginResponse]);

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