import '../css/newReleases.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearErrors, getProducts } from '../actions/productAction'
import Product from './Product'
import Loader from './Loader'


export default function NewReleases() {

  const {products, loading, error} = useSelector(state=>state.products)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors)
    }
    dispatch(getProducts())
  },[dispatch, error])

  return (
    <>
      {loading?<Loader />:<div className='mainNewReleases'>
        <div className='new-releases-container'>
          <p className='announcement'>Collection 2 release date: 31 Oct 4pm GMT</p>
          <div className='recent-release-div'>
            <h2>Recent release : </h2>
            <h3>Collection 1</h3>
            <div className='recent-items-div'>
              {products&&products.map((p)=><Product key={p._id} product={p} />)}
            </div>
          </div>
        </div>
      </div>}
    </>
    
  )
}
