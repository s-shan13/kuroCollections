export const updateReducer = (state={}, action)=>{
    switch(action.type){
        case "UPDT_REQ":
            return{
                ...state,
                loading: true,
            }
        case "UPDT_SUCC":
            return{
                ...state,
                loading: false,
                isUpdated: true
            }
        case "UPDT_FAIL":
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case "UPDT_RESET":
            return{
                ...state,
                isUpdated: false
            }
       
        case "CLEAR_ALL_ERRORS":
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}