import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

type User = {
    id: number;
    name: string;
    email: number;
};

export const cycleoApi = createApi({
    reducerPath: "cycleoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/cycleo/",
    }),
    endpoints: (builder) => ({
        getRentsInProgress: builder.query<any, null>({
            query: () => ({
                url: "/pu/rents/in_progress?size=1&sort=beginDate,DESC&version=2",
                credentials: 'include',
            }),
        }),
        getAuthInformations: builder.query<any, null>({
            query: () => ({
                url: "/pu/auth",
                credentials: 'include',
            }),
        }),
        login: builder.mutation<User, { username: string, password: string }>({
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
    useGetAuthInformationsQuery,
    useLoginMutation,
} = cycleoApi;
