
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import NewReleases from './components/NewReleases';
import AllProducts from './components/AllProducts';
import UserProfile from './components/UserProfile';
import ProductDetails from './components/ProductDetails'
import './css/app.css'
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from './actions/userAction';
import Orders from './components/Orders'
import UpdateProfile from './components/UpdateProfile';
import Search from './components/Search';
import ResetPassword from './components/ResetPassword';
import Cart from './components/Cart';
import NotFound from './components/NotFound';


function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkLogin())
  },[])

  window.addEventListener("contextmenu", (e)=>e.preventDefault())

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} exact></Route>
        <Route path='/product/:id' element={<ProductDetails  />} exact></Route>
        <Route path='/new-releases' element={<NewReleases />} exact></Route>
        <Route path='/all' element={<AllProducts />} exact></Route>
        <Route path='/t-shirts' element={<AllProducts title={'T-shirts'} prodCategory={'tee'} />} exact></Route>
        <Route path='/jumpers' element={<AllProducts title={'Jumpers'} prodCategory={'Jumper'} />} exact></Route>
        <Route path='/hoodies' element={<AllProducts title={'Hoodies'} prodCategory={'Hoodie'} />} exact></Route>
        <Route path='/login' element={<Login />} exact></Route>
        <Route path='/register' element={<Register />} exact></Route>
        <Route path='/profile' element={<UserProfile />} exact></Route>
        <Route path='/orders' element={<Orders />} exact></Route>
        <Route path='/profile/update' element={<UpdateProfile />} exact></Route>
        <Route path='/profile' element={<UserProfile />} exact></Route>
        <Route path='/cart' element={<Cart />} exact></Route>
        <Route path='/search' element={<Search />} exact></Route>
        <Route path='/password/reset' element={<ResetPassword />} exact></Route>
        <Route path='/:id' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
