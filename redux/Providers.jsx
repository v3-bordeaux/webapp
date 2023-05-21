"use client";

import {store} from "./store";
import {Provider} from "react-redux";
import {Layout} from "@/redux/Layout";

export function Providers({children}) {
    return (
        <Provider store={store}>
            <Layout>
                {children}
            </Layout>
        </Provider>
    );
}
