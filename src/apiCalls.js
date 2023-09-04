import axios from "axios"
import { loginFail, loginStart, loginSuccess } from "./Features/userSlice"

export const login = async(dispatch,user)=>
{
    dispatch(loginStart())
    try {
        const res=await axios.post('http://localhost:5001/auth/login',user)
        console.log(res)
        dispatch(loginSuccess(res.data))
        
    } catch (err) {
        console.log(err)
        dispatch(loginFail())
    }


}