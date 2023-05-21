"use client";

import {store} from "./store";
import {Provider, useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadFromLocalStorage} from "@/redux/features/cycleoTokenSlice";

export function Providers({children}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFromLocalStorage())
    }, []);
    
    return <Provider store={store}>{children}</Provider>;
}
