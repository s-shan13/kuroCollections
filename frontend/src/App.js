/**
 * Header => logo, home, new,  shop all (dropdown with categories)
 * Main home page
 * latest arrivals
 * Shop by category
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import './css/app.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' component={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
