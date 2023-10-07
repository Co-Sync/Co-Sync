import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      //might need to change method in terms of authentication - turn into post req and access body
      query: () => ({ url: '/user', method: 'GET' }),
    }),
    sendUserCreds: builder.mutation({
      query: (body) => ({ url: '/user', method: 'POST', body }),
    }),
  }),
});

// const { data: albums = [], isLoading, isFetching, isError, error,} = useGetUserQuery(page);

export const { useGetUserQuery, sendUserCreds } = userApi;