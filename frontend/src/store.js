import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productReducer } from './reducers/productReducer'
import { updateReducer } from './reducers/updateReducer'
import { userReducer } from './reducers/userReducer'

const store = configureStore({
    reducer:{
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        updated: updateReducer
    }
})

export default store
