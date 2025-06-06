import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/* ========================================================================
                                api (i.e., apiSlice)
======================================================================== */

export const api = createApi({
  keepUnusedDataFor: 60,
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }),
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Categories', 'Quiz', 'QuizResults'],
  endpoints: (_builder) => ({})
})
