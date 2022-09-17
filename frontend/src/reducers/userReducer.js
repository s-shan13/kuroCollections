

export const userReducer = (state={user:{}}, action)=>{
    switch(action.type){
        case "LOGIN_REQ":
            return{
                loading: true,
                isAuthenticated: false
            }
        case "LOGIN_SUCC":
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload 
            }
        case "LOGIN_FAIL":
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user:null,
                error: action.payload
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