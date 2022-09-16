import React, { useEffect } from 'react'
import '../css/home.css'
import Product from './Product'
import Typewriter from 'typewriter-effect'
import  MetaData  from './MetaData'
import {getProducts} from '../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'

export default function Home() {

  const alert = useAlert()
  const dispatch = useDispatch();
  const {loading, error, products, productsCount} = useSelector(state=>state.products)

  useEffect(()=>{
    if(error){
      return alert.error(error)
    }

    dispatch(getProducts())
  }, [dispatch, error, alert])

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
          
        </div>
      </div>
    </div>
  )
}
