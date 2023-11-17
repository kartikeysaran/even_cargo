import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'
import AboutUs from './pages/About/About'
import Blog from './pages/Blog/Blog'
import ContactUs from './pages/Contact/Contact'
import Service from './pages/Service/Service'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/about" exact element={<AboutUs/>} />
          <Route path="/contact" exact element={<ContactUs/>} />
          <Route path='/blog' exact element={<Blog/>}/>
          <Route path='/service' exact element={<Service/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
