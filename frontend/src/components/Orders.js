import { Link } from 'react-router-dom'
import '../css/orders.css'
import MetaData from './MetaData'

export default function Orders() {
  return (
    <div className="mainOrders">
      <h2>My orders</h2>
      <MetaData title={"Kuro collections - Orders"} />
      <div className='orders-div'>
          <p>You currently have no orders</p>
          <Link className='all-link' to="/all">Shop Now</Link>
      </div>
    </div>
  )
}
