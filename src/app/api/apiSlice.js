import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        console.log('Sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))
            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            // If refresh fails, log out the user
            api.dispatch(logOut())
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    if (result?.error?.status === 403) {
        console.log('Permission denied - checking token')
        // Could add additional handling for 403 errors here
        return result
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Recipe', 'User', 'SavedRecipes'],
    endpoints: builder => ({})
})