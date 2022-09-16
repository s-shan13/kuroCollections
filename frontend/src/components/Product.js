import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"



export default function Product({ product }) {
  //Configuration for reactStarts
  const options = {
    edit:false,
    color: "gray",
    activeColor: "orange",
    value: product.rating,
    isHalf: true
  }
  const navigate = useNavigate()
  const handleClick = () =>{
    console.log(1)
    navigate(`/product/${product._id}`)
  }
  return (


    <div className='productCard' onClick={handleClick}>
        <img className='productImg' src={product.images[0].url} alt={product.name} />
        <div className='prodDetails'>
            <p>{product.name}</p>
            <span>{`£${product.price}`}</span>
        </div>
        <div>
            <ReactStars {...options} /> <span>({product.numOfReviews} reviews)</span>
        </div>
        
    </div>

  )
}
