import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token:localStorage.getItem("token"),
    email:localStorage.getItem("email"),
    // isLoggedIn:!!localStorage.getItem("token"),
    isAuthenticated:!!localStorage.getItem('token'),
}

const authSlice = createSlice({

    name:'auth',
    initialState:initialAuthState,
    reducers: {

        login (state, action) {
            const {token, email} = action.payload;
            state.token = token;
            state.email = email;
            state.isAuthenticated = true;
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
        },
        logout(state) {
            state.token = null;
            state.email = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("email");
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice;