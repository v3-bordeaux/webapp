import {createApi} from "@reduxjs/toolkit/query/react";
import fetchBaseQueryAuth from "@/redux/services/query";

export const tbmWSApi = createApi({
    reducerPath: "tbmWSApi",
    baseQuery: fetchBaseQueryAuth({
        baseUrl: "/tbm/ws/",
    }),
    endpoints: (builder) => ({
        getVcubs: builder.query({
            query: () => ({
                url: `/vcubs`,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useGetVcubsQuery
} = tbmWSApi;
