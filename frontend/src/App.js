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
import './css/app.css'
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} exact></Route>
        <Route path='/new-releases' element={<NewReleases />} exact></Route>
        <Route path='/all' element={<AllProducts />} exact></Route>
        <Route path='/t-shirts' element={<AllProducts filter={'shirts'} />} exact></Route>
        <Route path='/jumpers' element={<AllProducts filter={'jumpers'} />} exact></Route>
        <Route path='/hoodies' element={<AllProducts filter={'hoodies'} />} exact></Route>
        <Route path='/profile' element={<UserProfile />} exact></Route>
        <Route path='/favourites' element={<AllProducts filter={'favourites'} />} exact></Route>
        <Route path='/bag' element={<AllProducts filter={'inCart'}/>} exact></Route>
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
