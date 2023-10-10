import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Projects', 'User'],
  endpoints: (builder) => ({
    getProject: builder.query({
      query: () => ({ url: '/project/', method: 'GET' }),
      providesTags: ['Projects'],
    }),
    sendUserCreds: builder.mutation({
      query: (body) => ({ url: '/user/login', method: 'POST', body }),
      providesTags: ['User'],
    }),
    signupUser: builder.mutation({
      query: (body) => ({ url: '/user/signup', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),
    addProject: builder.mutation({
      query: (body) => ({ url: '/project/', method: 'POST', body }),
      invalidatesTags: ['Projects'],
    }),
    // Body: { projectId, columnName}
    addColumn: builder.mutation({
      query: (body) => ({ url: '/project/column', method: 'POST', body }),
      invalidatesTags: ['Projects'],
    }),
    // Body: { projectId, columnId, taskName}
    addTask: builder.mutation({
      query: (body) => ({ url: '/project/task', method: 'POST', body }),
      invalidatesTags: ['Projects'],
    }),
    // Body: { projectId, columnId, taskId, taskName, taskComments}
    moveTask: builder.mutation({
      query: (body) => ({ url: '/project/', method: 'PATCH', body }),
      invalidatesTags: ['Projects'],
    }),
    updateTask: builder.mutation({
      query: (body) => ({ url: '/task', 
      method: 'PATCH', body }),
      invalidatesTags: ['Projects'],
    }),
    deleteTask: builder.mutation({
      query: (body, projectId, columnId, taskId) => ({ url: `/project/task/${projectId}/${columnId}/${taskId}`, method: 'DELETE', body }),
      invalidatesTags: ['Projects'],
    }),
    deleteColumn: builder.mutation({
      query: (body, projectId, columnId) => ({ url: `/project/column/${projectId}/${columnId}`, method: 'DELETE', body }),
      invalidatesTags: ['Projects'],
    }),
    deleteProject: builder.mutation({
      query: (body, projectId) => ({ url: `/project/${projectId}`, method: 'DELETE', body }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

// const { data: albums = [], isLoading, isFetching, isError, error,} = useGetUserQuery(page);

export const { useGetProjectQuery, useSendUserCredsMutation, useSignupUserMutation, useAddProjectMutation, useAddColumnMutation, useAddTaskMutation, useMoveTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation, useDeleteColumnMutation, useDeleteProjectMutation } = userApi;