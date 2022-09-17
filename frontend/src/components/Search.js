import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productAction'
import '../css/search.css'
import Product from './Product'

export default function Search() {

    const [keyword, setKeyword] = useState("")
    const {products} = useSelector(state=>state.products)
    const dispatch = useDispatch()

    const handleSearch = () =>{
        if(keyword.trim()){
            dispatch(getProducts(keyword))
        }
    }

  return (
    <div className='mainSearch'>
        <div className='search-bar'>
            <input type="text" placeholder="Search" className="search-box" onChange={(e)=>setKeyword(e.target.value)} />
            <p className="search-btn" onClick={handleSearch}>Search</p>
        </div>

        <div className='searh-products-container'>
            {products&&products.map((p)=><Product key={p._id} product={p} />)}
        </div>
    </div>
  )
}
