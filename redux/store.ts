import {configureStore} from "@reduxjs/toolkit";
import cykleoTokenReducer from "@/redux/features/cykleoTokenSlice";
import {cykleoApi} from "@/redux/services/cykleoApi";
import {setupListeners} from "@reduxjs/toolkit/dist/query";
import {tbmWSApi} from "@/redux/services/tbmWSApi";

export const store = configureStore({
    reducer: {
        cykleoTokenReducer,
        [cykleoApi.reducerPath]: cykleoApi.reducer,
        [tbmWSApi.reducerPath]: tbmWSApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([cykleoApi.middleware, tbmWSApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;