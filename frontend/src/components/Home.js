import React, { useEffect } from 'react'
import '../css/home.css'
import Product from './Product'
import Typewriter from 'typewriter-effect'
import  MetaData  from './MetaData'
import {getProducts} from '../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'

export default function Home() {

  const dispatch = useDispatch();
  const {loading, error, products, productsCount} = useSelector(state=>state.products)

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className='mainHomeDiv'>

      <MetaData title="Kuro Collection - Home" />
      <div className='top'>
        <Typewriter 
          onInit={(typewriter)=>{
            typewriter.typeString("Welcome to Kuro Collections!").start()
          }}
        />

      </div>
      <div className='bottom'>
        <h2 className='bottom-title'>Featured Products</h2>
        <div className='product-container'>
          
          {products && products.map((product) => <Product product={product} />)}
          {console.log(products)}
        </div>
      </div>
    </div>
  )
}
