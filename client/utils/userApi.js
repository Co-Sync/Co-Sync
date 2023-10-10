import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  // had to change baseUrl to the actual url to the api we want to make the req to and not the end path 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: '/user', method: 'GET' }),
    }),
    sendUserCredsMutation: builder.mutation({
      query: (body) => ({ url: '/user', method: 'POST', body }),
    }),
  }),
});

// const { data: albums = [], isLoading, isFetching, isError, error,} = useGetUserQuery(page);

export const { useGetUserQuery, sendUserCredsMutation } = userApi;