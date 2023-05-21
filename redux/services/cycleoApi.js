import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cycleoApi = createApi({
    reducerPath: "cycleoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/cycleo/",
    }),
    endpoints: (builder) => ({
        getRentsInProgress: builder.query({
            query: () => ({
                url: "/pu/rents/in_progress?size=1&sort=beginDate,DESC&version=2",
                credentials: 'include',
            }),
        }),
        getRentsCompleted: builder.query({
            query: () => ({
                url: "/pu/rents/completed?sort=beginDate,DESC",
                credentials: 'include',
            }),
        }),
        getAuthInformations: builder.query({
            query: () => ({
                url: "/pu/auth",
                credentials: 'include',
            }),
        }),
        login: builder.mutation({
            query: ({username, password}) => ({
                url: `/pu/auth`,
                credentials: 'include',
                method: 'POST',
                body: {
                    organizationId: 7,
                    username,
                    password
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
    }),
});

export const {
    useGetRentsInProgressQuery,
    useGetRentsCompletedQuery,
    useGetAuthInformationsQuery,
    useLoginMutation,
} = cycleoApi;
