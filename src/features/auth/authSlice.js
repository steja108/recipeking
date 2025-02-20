import { createSlice } from '@reduxjs/toolkit'
import {jwtDecode} from 'jwt-decode';

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        token: null,
        userId: null,
        roles: []
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken} = action.payload
            state.token = accessToken
            const decoded = jwtDecode(accessToken);
            state.userId = decoded.UserInfo.id; // Store user ID
            state.roles = decoded.UserInfo.roles;
        },
        logOut: (state, action) => {
            state.token = null
            state.userId = null
            state.roles = []
            localStorage.clear()
            sessionStorage.clear()
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUserId = (state) => state.auth.userId
export const selectCurrentRoles = (state) => state.auth.roles