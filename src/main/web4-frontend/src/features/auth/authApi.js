import {api} from "../../app/api/api";
import {encode} from "js-base64";

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: ({username, password}) => ({
                url: '/auth/login',
                method: 'POST',
                body: {username, password}
            }),
            transformResponse: (response) => response,
        }),
        register: builder.mutation({
            query: ({username, password}) => ({
                url: '/auth/signup',
                method: 'POST',
                body: {username, password}
            }),
            transformResponse: (response) => response
        }),
        logout: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/logout',
                method: 'POST',
                body: {refreshToken}
            }),
            transformResponse: (response) => response
        }),
        logoutAll: builder.mutation({
            query: ({refreshToken}) => ({
                url: '/auth/logout-all',
                method: 'POST',
                body: {refreshToken}
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useLogoutAllMutation} = authApi