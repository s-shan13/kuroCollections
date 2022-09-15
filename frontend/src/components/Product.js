import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"



export default function Product({ product }) {
  const options = {
    edit:false,
    color: "gray",
    activeColor: "orange",
    value: product.rating,
    isHalf: true
}
  return (


    <Link className='productCard' to={product._id}>
        <img className='productImg' src={product.images[0].url} alt={product.name} />
        <div className='prodDetails'>
            <p>{product.name}</p>
            <span>{`£${product.price}`}</span>
        </div>
        <div>
            <ReactStars {...options} /> <span>({product.numOfReviews} reviews)</span>
        </div>
        
    </Link>

  )
}
