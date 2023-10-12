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
      query: (body) => ({ url: '/user/login', method: 'POST', body, credentials: 'include' }),
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
    // addComment: builder.mutation({
    //   query: (body) => ({ url: '/project/task/comment', method: 'POST', body }),
    //   invalidatesTags: ['Projects'],
    // }),
    // Body: { projectId, columnId, taskId, taskName, taskComments}
    moveTask: builder.mutation({
      query: (body) => ({ url: '/project/', method: 'PATCH', body }),
      invalidatesTags: ['Projects'],
    }),
    updateTask: builder.mutation({
      query: (body) => ({
        url: '/project/task',
        method: 'PATCH', body
      }),
      invalidatesTags: ['Projects'],
    }),
    deleteTask: builder.mutation({
      query: ({ projectId, columnId, taskId }) => ({ url: `/project/task/${projectId}/${columnId}/${taskId}`, method: 'DELETE', }),
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
    validateUser: builder.query({
      query: () => ({ url: '/user/validate', method: 'GET', credentials: 'include' }),
      providesTags: ['User'],
    }),
  }),
});

export const { useGetProjectQuery, useSendUserCredsMutation, useSignupUserMutation, useAddProjectMutation, useAddColumnMutation, useAddTaskMutation, useMoveTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation, useDeleteColumnMutation, useDeleteProjectMutation, useValidateUserQuery } = userApi;
