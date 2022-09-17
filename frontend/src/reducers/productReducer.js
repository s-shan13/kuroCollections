//Reducer for all products
export const productReducer = (state={products:[]}, action)=>{
    switch(action.type){
        case "ALL_PRODUCT_REQ":
            return{
                loading: true,
                product: []
            }
        case "ALL_PRODUCT_SUCC":
            return{
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }
        case "ALL_PRODUCT_FAIL":
            return{
                loading: false,
                error: action.payload
            }
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

//Reducer for a single product
export const productDetailsReducer = (state={products:{}}, action)=>{
    switch(action.type){
        case "PRODUCT_DETAILS_REQ":
            return{
                loading: true,
                ...state
            }
        case "PRODUCT_DETAILS_SUCC":
            return{
                loading: false,
                product: action.payload
            }
        case "PRODUCT_DETAILS_FAIL":
            return{
                loading: false,
                error: action.payload
            }
        case "CLEAR_ALL_ERRORS":
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}