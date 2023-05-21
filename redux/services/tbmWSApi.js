import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const tbmWSApi = createApi({
    reducerPath: "tbmWSApi",
    baseQuery: fetchBaseQuery({
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
