import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import cycleoTokenReducer from "@/redux/features/cykleoTokenSlice";
import {cykleoApi} from "@/redux/services/cykleoApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        counterReducer,
        cycleoTokenReducer,
        [cykleoApi.reducerPath]: cykleoApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([cykleoApi.middleware]),
});

setupListeners(store.dispatch);