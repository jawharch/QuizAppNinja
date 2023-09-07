import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null,
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
                localStorage.setItem('user', JSON.stringify(action.payload));

            },
            loginFail:(state,action)=>
            {
                state.isFetching=false
                state.error=true

            },
            resetUser:(state,action)=>
            {
                localStorage.removeItem('user')
                return{
                    
                    ...initialState
                }

            }

        }
    }
)
export const { loginFail, loginStart, loginSuccess,resetUser} = userSlice.actions;
export default userSlice.reducer