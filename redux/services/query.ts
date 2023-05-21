import type {BaseQueryFn, FetchArgs, FetchBaseQueryError,} from '@reduxjs/toolkit/query'
import {fetchBaseQuery} from '@reduxjs/toolkit/query'
import {invalidateToken} from "@/redux/features/cykleoTokenSlice";

export default function fetchBaseQueryAuth(params) {
    const baseQuery = fetchBaseQuery(params);

    const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,
        unknown,
        FetchBaseQueryError> = async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions)
        if (result?.error && result?.error.status === 401) {
            api.dispatch(invalidateToken());
            location.reload();
        }
        return result
    }

    return baseQueryWithReauth;
}
