import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    authenticated: !!localStorage.getItem('refresh'),
    accessToken: localStorage.getItem('access'),
    refreshToken: localStorage.getItem('refresh'),
    userName: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAccessToken: (state,action)=>{
            state.accessToken = action.payload;
            localStorage.setItem('access', action.payload)
        },
        setRefreshToken: (state,action)=>{
            state.refreshToken = action.payload;
            localStorage.setItem('refresh', action.payload)
        },
        setCredentials: (state, action)=>{
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.accessToken;
            state.authenticated=true;
            localStorage.setItem('refresh', action.payload.refreshToken);
            localStorage.setItem('access', action.payload.accessToken)
        },
        setUsername: (state, action)=>{
            state.userName = action.payload;
        },
        setAuthenticated: (state, action)=>{
            state.authenticated = action.payload;
        },
        logoutTest: (state, action)=>{
            localStorage.removeItem('refresh');
            localStorage.removeItem('access')
            state.userName=null;
            state.accessToken=null;
            state.refreshToken=null;
            state.authenticated=false;
        }
    }
})

export const {setAccessToken,setAuthenticated, setRefreshToken, setCredentials, setUsername,logoutTest}=userSlice.actions
export default userSlice.reducer;

export const selectUsername = state => state.user.userName;
export const selectAccessToken = state => state.user.accessToken;
export const selectRefreshToken = state => state.user.refreshToken;
export const selectAuthenticated = state =>state.user.authenticated;