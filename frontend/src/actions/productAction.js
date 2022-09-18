import axios from "axios";

export const getProducts = (prodCategory="", price=[0,150]) => async (dispatch) =>{
    try {
        dispatch({type: "ALL_PRODUCT_REQ"})
        
        console.log(prodCategory.toLowerCase())
        const link = `/api/v1/products?keyword=${prodCategory.toLowerCase()}&price[$gte]=${price[0]}&price[$lte]=${price[1]}`

        const {data} = await axios.get(link)

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

export const getProductDetails = (id) => async (dispatch) =>{

    try {
        
        dispatch({type: "PRODUCT_DETAILS_REQ"})

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: "PRODUCT_DETAILS_SUCC",
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: "PRODUCT_DETAILS_FAIL",
            payload: error.response.data.message
        })
    }
}

export const addToBasket = (id) => async (dispatch) =>{
    try {
        dispatch({type:"ADD_BASKET_REQ"})

        dispatch({type:"ADD_BASKET_SUCC"})

    } catch (error) {
        dispatch({type:"ADD_BASKET_FAIL"})
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: "CLEAR_ALL_ERRORS"
    })
}