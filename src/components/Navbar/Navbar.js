import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import ECLogo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="left">
          <i className="icon">
            <img src={ECLogo} alt="Logo" />
          </i>
        </div>
        <div className="right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/service">Service</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;