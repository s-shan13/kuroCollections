import React from 'react'
import '../css/home.css'
import Product from './Product'
import Typewriter from 'typewriter-effect'
import  MetaData  from './MetaData'

const product = {
  name:"tmp prod",
  images: [{url:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQuy2VpfnE-GZ1wCHEhB7kAy9gr6c2FddrBS1QZB6z3AAQg8SC9Hn27Pby4wbHhbsRTu-QuJE_amqgnIIav9d03U7qKOqDvHw&usqp=CAY"}],
  price: "£20.00",
  _id:"tmpid"
}

export default function Home() {
  return (
    <div className='mainHomeDiv'>

      <MetaData title="Kuro Collection - Home" />
      <div className='top'>
        <Typewriter 
          onInit={(typewriter)=>{
            typewriter.typeString("Welcome to Kuro Collections!").start()
          }}
        />
        {/* <h1>Welcome to Kuro collections</h1> */}
      </div>
      <div className='bottom'>
        <h2 className='bottom-title'>Featured Products</h2>
        <div className='product-container'>
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
        </div>
      </div>
    </div>
  )
}
