import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import cycleoTokenReducer from "@/redux/features/cycleoTokenSlice";
import {cycleoApi} from "@/redux/services/cycleoApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        counterReducer,
        cycleoTokenReducer,
        [cycleoApi.reducerPath]: cycleoApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([cycleoApi.middleware]),
});

setupListeners(store.dispatch);