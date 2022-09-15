import axios from "axios";

export const getProducts = () => async (dispatch) =>{
    try {
        dispatch({type: "ALL_PRODUCT_REQUEST"})

        const {data} = await axios.get("/api/v1/products")

        dispatch({
            type: "ALL_PRODUCT_SUCC",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "ALL_PRODUCT_FAIL",
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: "CLEAR_ALL_ERRORS"
    })
}