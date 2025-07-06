import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'
import AboutUs from './pages/About/About'
import Blog from './pages/Blog/Blog'
import ContactUs from './pages/Contact/Contact'
import Service from './pages/Service/Service'
import Footer from './components/Footer/Footer'
import EvenCargoDashboard from './pages/Dashboard/EvenCargoDashboard';
import GirlProfiles from './components/Dashboard/GirlProfiles';

const AppContent = () => {
  const location = useLocation();

  const shouldHideLayout = location.pathname.startsWith('/dashboard');

  return (
    <div>
      {!shouldHideLayout && <Navbar />}
      
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<AboutUs />} />
        <Route path="/contact" exact element={<ContactUs />} />
        <Route path="/blog" exact element={<Blog />} />
        <Route path="/service" exact element={<Service />} />
        <Route path="/dashboard" exact element={<EvenCargoDashboard />} />
        <Route path="/dashboard/profiles" exact element={<GirlProfiles />} />
      </Routes>
      
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
