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
    getUserProjects: builder.query({
      query: () => ({ url: '/user/projects', method: 'GET', credentials: 'include' }),
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
    // Body: { projectId, oldColumnId, newColumnId, taskId}
    moveTask: builder.mutation({
      query: (body) => ({ url: '/project/column/', method: 'PATCH', body }),
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
      query: ({ projectId, columnId }) => ({ url: `/project/column/${projectId}/${columnId}`, method: 'DELETE' }),
      invalidatesTags: ['Projects'],
    }),
    deleteProject: builder.mutation({
      query: ({ projectId }) => ({ url: `/project/${projectId}`, method: 'DELETE' }),
      invalidatesTags: ['Projects'],
    }),
    inviteUser: builder.mutation({
      query: (body) => ({ url: '/user/invite', method: 'POST', body }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const { useGetProjectQuery, useSendUserCredsMutation, useSignupUserMutation, useAddProjectMutation, useAddColumnMutation, useAddTaskMutation, useMoveTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation, useDeleteColumnMutation, useDeleteProjectMutation, useGetUserProjectsQuery, useInviteUserMutation } = userApi;
