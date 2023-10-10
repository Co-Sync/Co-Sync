import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProject: builder.query({
      query: () => ({ url: '/project/', method: 'GET' }),
    }),
    sendUserCreds: builder.mutation({
      query: (body) => ({ url: '/user/login', method: 'POST', body }),
    }),
    signupUser: builder.mutation({
      query: (body) => ({ url: '/user/signup', method: 'POST', body }),
    }),
    addProject: builder.mutation({
      query: (body) => ({ url: '/project/', method: 'POST', body }),
    }),
    // Body: { projectId, columnName}
    addColumn: builder.mutation({
      query: (body) => ({ url: '/project/column', method: 'POST', body }),
    }),
    // Body: { projectId, columnId, taskName}
    addTask: builder.mutation({
      query: (body) => ({ url: '/project/task', method: 'POST', body }),
    }),
    // Body: { projectId, columnId, taskId, taskName, taskComments}
    moveTask: builder.mutation({
      query: (body) => ({ url: '/project/', method: 'PATCH', body }),
    }),
    deleteTask: builder.mutation({
      query: (body, projectId, columnId, taskId) => ({ url: `/project/task/${projectId}/${columnId}/${taskId}`, method: 'DELETE', body }),
    }),
    deleteColumn: builder.mutation({
      query: (body, projectId, columnId) => ({ url: `/project/column/${projectId}/${columnId}`, method: 'DELETE', body }),
    }),
    deleteProject: builder.mutation({
      query: (body, projectId) => ({ url: `/project/${projectId}`, method: 'DELETE', body }),
    }),
  }),
});

// const { data: albums = [], isLoading, isFetching, isError, error,} = useGetUserQuery(page);

export const { useGetProjectQuery, useSendUserCredsMutation, useSignupUserMutation, useAddProjectMutation, useAddColumnMutation, useAddTaskMutation, useMoveTaskMutation, useDeleteTaskMutation, useDeleteColumnMutation, useDeleteProjectMutation } = userApi;