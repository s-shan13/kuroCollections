import { useSelector } from 'react-redux'
import '../css/cart.css'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

export default function Cart() {

    const navigate = useNavigate()
    const {user} = useSelector(state=>state.user)
  return (
    <>
        {user?<div className='mainCart'>
        <div className='price-total-div'>
            <div className='flex items-price'>
                <p>Items:</p>
                <p>£0.00</p>
            </div>
            <div className='flex taxes-price'>
                <p>Taxes:</p>
                <p>£0.00</p>
            </div>
            <div className='flex shipping-price'>
                <p>Shipping:</p>
                <p>£0.00</p>
            </div>
            <div className='flex total-price'>
                <p>Total:</p>
                <p>£0.00</p>
            </div>
        </div>
        <div className='cart-items-div'>
            <h3>No items in cart</h3>
        </div>
    </div>:<Login />}
    </>
    
  )
}
