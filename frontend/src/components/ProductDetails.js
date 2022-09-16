import React, { useEffect } from 'react'
import '../css/productDetails.css'
import Carousel from "react-material-ui-carousel"
import {useSelector, useDispatch} from 'react-redux'
import { getProductDetails, getProducts } from '../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import Product from './Product'

export default function ProductDetails() {
    const {id} = useParams()
    
    const dispatch = useDispatch()

    const {product, loading, error} = useSelector((state)=>state.productDetails)
    const {products} = useSelector((state)=>state.products)

    useEffect(()=>{
        dispatch(getProductDetails(id))
        dispatch(getProducts())
        window.scrollTo(0,0)
    }, [dispatch, error, alert, id])

    const options ={
        edit: false,
        color: "black",
        activeColor: "white",
        value:4.5,
        isHalf: true,
    }
    let newProducts

  return (
    <div className='mainProductDetails'>
        <div className='top-container'>
            <div className='product-image-div'>
                <Carousel>
                    {product && product.images.map((item)=>(
                        <img className='CarouselImage' key={item.url} src={item.url} alt="product" />
                    ))}
                </Carousel>
            </div>
            <div className='product-details-div'>
                <h2>{product&&product.name}</h2>
                <p className='desc'>{product&&product.description}</p>
                <p>Size</p>
                <div className='qty'>
                    <p>Quantity:</p>
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                </div>
                <p>£{product&&product.price}</p>
                <button>Add to cart</button>
                <span className={product&&product.stock<1?"redTxt":"greenTxt"}>{product&&product.stock<1?"Sold out":"In Stock"}</span>
                <p></p>
                <ReactStars {...options} />
                <span>({product && product.numOfReviews} Reviews)</span>
            </div>
        </div>
        <div className='bottom-container'>
            <h2 className='bottom-title'>You may also Like</h2>
            <div className='moreProduct-container'>
                
                {products&&products.filter(p=>{return p._id!==id}).map(p=>{return <Product product={p} />})}
          
            </div>
        </div>
    </div>
  )
}