'use client';
import {useAppDispatch} from "@/redux/hooks";
import {Button} from "@/components/atoms/Button";
import {invalidToken} from "@/redux/features/cycleoTokenSlice";
import {Card} from "@/components/atoms/Card";

export default function Logout() {
    const dispatch = useAppDispatch();

    function signOut() {
        dispatch(invalidToken());
    }

    return (
        <Card>
            <Button className="!bg-red-500 text-white" onClick={signOut}>Se déconnecter</Button>
        </Card>
    )
}