import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userDetails: {},
    userToken: "",
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        getUserDetails: (state, action) =>{
            state.userDetails = action.payload;
        },
        getUserToken: (state, action) =>{
            state.userToken = action.payload;
        },
        logoutUser: (state) =>{
            state.userDetails = {};
            state.userToken = "";
        }

    }
})


export const { getUserDetails, getUserToken, logoutUser} = authSlice.actions;

export default authSlice.reducer;