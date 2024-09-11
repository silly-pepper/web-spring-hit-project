import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setAccessToken, logout, logoutTest} from "../../features/auth/userSlice";


export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const bool = getState().user.authenticated
        // const token = getState().user.accessToken
         const token = localStorage.getItem('access')
        if (bool) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const logoutQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    if (api.endpoint === 'logout'){
        await logoutQuery(args, api, extraOptions);
    }else{
        let result = await baseQuery(args, api, extraOptions)
        if (result?.error?.status===401 && api.endpoint!=='login') {
            console.log('sending refresh token')
            const refreshResult = await baseQuery({url: '/auth/access-token',body: {refreshToken: localStorage.getItem('refresh')}, method: 'POST'}, api, extraOptions)
            if (refreshResult?.data) {
                api.dispatch(setAccessToken(refreshResult.data.accessToken));
                result = await baseQuery(args, api, extraOptions)
            } else {
                api.dispatch(logoutTest())
            }
        }
        return result
    }



}


export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['hits'],
    endpoints: builder => ({})
})