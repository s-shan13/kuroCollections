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

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: "CLEAR_ALL_ERRORS"
    })
}