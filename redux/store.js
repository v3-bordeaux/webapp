import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import cycleoTokenReducer from "@/redux/features/cycleoTokenSlice";

export const store = configureStore({
    reducer: {
        counterReducer,
        cycleoTokenReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});
