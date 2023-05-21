import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import cycleoTokenReducer from "@/redux/features/cykleoTokenSlice";
import {cykleoApi} from "@/redux/services/cykleoApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {tbmWSApi} from "@/redux/services/tbmWSApi";

export const store = configureStore({
    reducer: {
        counterReducer,
        cycleoTokenReducer,
        [cykleoApi.reducerPath]: cykleoApi.reducer,
        [tbmWSApi.reducerPath]: tbmWSApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([cykleoApi.middleware, tbmWSApi.middleware]),
});

setupListeners(store.dispatch);