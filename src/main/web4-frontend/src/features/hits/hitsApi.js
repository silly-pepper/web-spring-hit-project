import {api} from "../../app/api/api";

export const hitsApi = api.injectEndpoints({
    endpoints: builder => ({
        getHitsPage: builder.query({
            query: ({page, size}) => ({
                url: `/hits/pagination/?page=${page}&size=${size}`,
                method: 'GET'
            }),
            providesTags: ['hits'],
            transformResponse: (response) => response
        }),
        countAll: builder.query({
            query: () => ({
                url: "/hits/count",
                method: "GET"
            }),
            providesTags: ['hits'],
            transformResponse: (response) => response
        }),
        shoot: builder.mutation({
            query: ({x, y, r}) => ({
                url: '/hits',
                method: 'POST',
                body: {x, y, r}
            }),
            invalidatesTags: ['hits'],
            transformResponse: (response) => response,
        }),
        clear: builder.mutation({
            query: () => ({
                url: 'hits',
                method: 'DELETE'
            }),
            invalidatesTags: ['hits'],
            transformResponse: (response) => response
        })

    })
})

export const {useShootMutation, useCountAllQuery, useClearMutation, useGetHitsPageQuery} = hitsApi