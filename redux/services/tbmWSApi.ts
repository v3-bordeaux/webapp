import {createApi} from "@reduxjs/toolkit/query/react";
import fetchBaseQueryAuth from "@/redux/services/query";
import {VcubResponse} from "@/types/tbm/ws/station";

export const tbmWSApi = createApi({
    reducerPath: "tbmWSApi",
    baseQuery: fetchBaseQueryAuth({
        baseUrl: "/tbm/ws/",
    }),
    endpoints: (builder) => ({
        getVcubs: builder.query<VcubResponse, void>({
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
