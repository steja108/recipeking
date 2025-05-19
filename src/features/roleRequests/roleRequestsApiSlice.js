// src/features/roleRequests/roleRequestsApiSlice.js
import { apiSlice } from "../../app/api/apiSlice";

export const roleRequestsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Get all role requests (admin only)
        getRoleRequests: builder.query({
            query: () => '/api/role-requests',
            providesTags: (result) => 
                result
                    ? [
                        { type: 'RoleRequest', id: 'LIST' },
                        ...result.map(request => ({ type: 'RoleRequest', id: request._id }))
                      ]
                    : [{ type: 'RoleRequest', id: 'LIST' }]
        }),
        
        // Get user's own role requests
        getUserRoleRequests: builder.query({
            query: () => '/api/role-requests/mine',
            providesTags: ['UserRoleRequests']
        }),
        
        // Create new role request
        createRoleRequest: builder.mutation({
            query: (requestData) => ({
                url: '/api/role-requests',
                method: 'POST',
                body: requestData
            }),
            invalidatesTags: ['UserRoleRequests']
        }),
        
        // Process role request (admin only)
        processRoleRequest: builder.mutation({
            query: ({ id, status, adminNote }) => ({
                url: `/api/role-requests/${id}`,
                method: 'PATCH',
                body: { status, adminNote }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'RoleRequest', id: arg.id },
                { type: 'RoleRequest', id: 'LIST' }
            ]
        }),
        
        // Mark request as read by user
        markRequestAsRead: builder.mutation({
            query: (id) => ({
                url: `/api/role-requests/${id}/read`,
                method: 'PATCH'
            }),
            invalidatesTags: ['UserRoleRequests']
        }),
        
        // Get unread requests count (admin only)
        getUnreadRequestsCount: builder.query({
            query: () => '/api/role-requests/count/unread',
            providesTags: ['UnreadCount']
        })
    })
});

export const {
    useGetRoleRequestsQuery,
    useGetUserRoleRequestsQuery,
    useCreateRoleRequestMutation,
    useProcessRoleRequestMutation,
    useMarkRequestAsReadMutation,
    useGetUnreadRequestsCountQuery
} = roleRequestsApiSlice;