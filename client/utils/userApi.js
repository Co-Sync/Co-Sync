import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK query is a data fetching and caching tool -- eliminates the need to hand-write data fetching and cachce logic yourself

// works similary like fetch() with passed in url and method

// Provided tags are used to determine whether cached data returned by an endpoint should be invalidated and either be refetched or removed from the cache - auto-refetch data

// @https://redux-toolkit.js.org/rtk-query/overview

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Projects', 'User', 'Friends', 'Collaborators'],
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
      invalidatesTags: ['Projects']
    }),
    logoutUser: builder.mutation({
      query: () => ({ url: '/user/logout', method: 'GET', credentials: 'include' }),
      invalidatesTags: ['User'],
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
    moveTask: builder.mutation({
      query: (body) => ({ url: '/project/column/', method: 'PATCH', body }),
      invalidatesTags: ['Projects'],
    }),
    updateTask: builder.mutation({
      query: (body) => ({ url: '/project/task', method: 'PATCH', body}),
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
    getAllCollaborators: builder.query({
      query: ({projectId}) => ({ url: `/collaboration/${projectId}`, method: 'GET', credentials: 'include' }),
      providesTags: ['Collaborators'],
    }),
    inviteUser: builder.mutation({
      query: (body) => ({ url: '/collaboration/add', method: 'POST', body }),
      invalidatesTags: ['Collaborators'],
    }),
    getAllFriends: builder.query({
      query: () => ({ url: '/friend-requests/all', method: 'GET', credentials: 'include' }),
      providesTags: ['Friends'],
    }),
    sendFriendRequest: builder.mutation({
      query: (body) => ({ url: '/friend-requests/sendRequest', method: 'POST', body, credentials: 'include' }),
      invalidatesTags: ['Friends'],
    }),
    acceptFriendRequest: builder.mutation({
      query: (body) => ({ url: '/friend-requests/accept', method: 'PATCH', body, credentials: 'include' }),
      invalidatesTages:['Friends']
    }),
    removeFriend: builder.mutation({
      query: (body) => ({ url: '/friend-requests/remove', method: 'DELETE', body, credentials: 'include' }),
      invalidatesTags: ['Friends'],
    }),
  }),
});

// naming convention for exported functions can be written to your liking - we practiced adding 'Mutation' or 'Query' at the end of each endpoint function

export const {
  useGetProjectQuery,
  useSendUserCredsMutation,
  useSignupUserMutation,
  useLogoutUserMutation,
  useAddProjectMutation,
  useAddColumnMutation,
  useAddTaskMutation,
  useMoveTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useDeleteColumnMutation,
  useDeleteProjectMutation,
  useGetUserProjectsQuery,
  useGetAllCollaboratorsQuery, 
  useInviteUserMutation,
  useGetAllFriendsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useRemoveFriendMutation,
  abort
} = userApi;
