import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const options = {
    edit:false,
    color: "gray",
    activeColor: "orange",
    value: 4.0,
    isHalf: true
}

export default function Product({ product }) {
  return (


    <Link className='productCard' to={product._id}>
        <img className='productImg' src={product.images[0].url} alt={product.name} />
        <div className='prodDetails'>
            <p>{product.name}</p>
            <span>{product.price}</span>
        </div>
        <div>
            <ReactStars {...options} /> <span>(256 reviews)</span>
        </div>
        
    </Link>

  )
}
