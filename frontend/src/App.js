/**
 * Header => shop all (dropdown with categories)
 * Main home page
 * latest arrivals
 * Shop by category
 */
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

function App() {
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
        <Route path='/favourites' element={<AllProducts prodCategory={'favourites'} />} exact></Route>
        <Route path='/bag' element={<AllProducts filter={'inCart'}/>} exact></Route>
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
