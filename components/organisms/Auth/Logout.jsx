'use client';
import {useAppDispatch} from "@/redux/hooks";
import {Button} from "@/components/atoms/Button";
import {invalidateToken} from "@/redux/features/cykleoTokenSlice";
import {Card} from "@/components/atoms/Card";

export default function Logout() {
    const dispatch = useAppDispatch();

    function signOut() {
        dispatch(invalidateToken());
    }

    return (
        <Card>
            <Button className="!bg-red-500 text-white" onClick={signOut}>Se déconnecter</Button>
        </Card>
    )
}