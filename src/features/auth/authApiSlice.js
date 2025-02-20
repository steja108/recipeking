import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"
import { jwtDecode } from "jwt-decode"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
            
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logOut())
                    // Immediately reset API state
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;

                    // Decode the new token
                    const decoded = jwtDecode(accessToken);
                    dispatch(setCredentials({ 
                        accessToken,
                        userId: decoded.UserInfo.id,
                        roles: decoded.UserInfo.roles 
                    }));
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 