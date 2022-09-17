import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type:"LOGIN_REQ"})
        //config for post request data
        const config = {headers:{"Content-Type":"application/json"}}

        const {data} = await axios.post(
            "api/v1/login",
            {email,password},
            config
        )

        dispatch({type:"LOGIN_SUCC", payload: data.user})
        
    } catch (error) {
        dispatch({type:"LOGIN_FAIL", payload: error.response.data.message})
    }
}

export const createAccount = (email, password, name) =>async(dispatch)=>{
    try {
        dispatch({type:"REG_REQ"})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post(
            "/api/v1/register",
            {name, email, password},
            config
        )
        dispatch({type:"REG_SUCC", payload: data.user})
        
    } catch (error) {
        dispatch({type:"REG_FAIL", payload: error.response.data.message})
    }
}

export const checkLogin = () => async (dispatch) => {
    try {
        dispatch({type:"USER_CHECK_REQ"})

        const {data} = await axios.get("api/v1/me")
   

        dispatch({type:"USER_CHECK_SUCC", payload: data.user})
        
    } catch (error) {
        dispatch({type:"USER_CHECK_FAIL", payload: error.response.data.message})
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: "CLEAR_ALL_ERRORS"
    })
}