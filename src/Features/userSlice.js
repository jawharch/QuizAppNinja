import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    isFetching:false,
    error:false

}
const userSlice=createSlice(
    {
        name:'user',
        initialState,
        reducers:
        {
            loginStart:(state,action)=>
            {
                state.isFetching=true

            },
            loginSuccess:(state,action)=>
            {
                state.isFetching=false
                state.currentUser=action.payload

            },
            loginFail:(state,action)=>
            {
                state.isFetching=false
                state.error=true

            }

        }
    }
)
export const { loginFail, loginStart, loginSuccess} = userSlice.actions;
export default userSlice.reducer