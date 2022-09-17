import '../css/allProducts.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from '../actions/productAction'
import Product from './Product'
import { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import {withStyles} from '@mui/styles'
import { Link } from 'react-router-dom'

const CustomSlider = withStyles({
    root: {
        color: "white",
        height: 3,
        padding: "0",
    },
    track: {
        height: 5,
        borderRadius: 2,
        color:"white"
    },
    thumb: {
        height: 15,
        width: 15,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        color: "#fff",
    },
})(Slider);

export default function AllProducts( props ) {

  const dispatch = useDispatch()

  const {products, loading, error} = useSelector(state=>state.products)
  const {prodCategory, title} = props

  const [price, setPrice] = useState([0,150])

  const handleRangeChange = (event, newPrice) =>{
    setPrice(newPrice)
  }

  useEffect(()=>{
    dispatch(getProducts(prodCategory, price))
  },[dispatch, prodCategory, price])
  return (
    <>
      {loading?<h1>loading</h1>:
      <div className='mainAllProducts'>
        <h2 className='all-products-heading'>{title?title:"All items"}</h2>

        <div className='main-body'>
          <div className='filter-container'>
            <p>Price</p>
              <CustomSlider 
                value={price}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby='range-slider'
                min={0}
                max={150}
              />
              <div className='category-links'>
                <Link className='category-link' to="/t-shirts">T-shirts</Link>
                <Link className='category-link' to="/jumpers">Jumpers</Link>
                <Link className='category-link' to="/hoodies">Hoodies</Link>
              </div>
          </div>
          <div className='all-products-container'>
            {products&&products.map(p=><Product key={p._id} product={p} />)}
          </div>


        </div>
        
      </div>}
    </>
  )
}
