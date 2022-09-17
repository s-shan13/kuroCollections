import axios from "axios";

export const updateDetails = (email, name) =>async(dispatch)=>{
    try {
        dispatch({type:"UPDT_REQ"})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.put(
            "/api/v1/me/update",
            {name, email},
            config
        )
        dispatch({type:"UPDT_SUCC", payload: data.user})
        
    } catch (error) {
        dispatch({type:"UPDT_FAIL", payload: error.response.data.message})
    }
}