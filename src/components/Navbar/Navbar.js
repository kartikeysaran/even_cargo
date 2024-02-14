import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import ECLogo from '../../assets/logo.png'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav>
        <div className="left">
          <img className="logo" src={ECLogo} alt="Logo" />
        </div>
        <div className="right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/service">Service</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
        <IoMdMenu/>
        </div>
      </nav>
      {showMenu && (
        <div className="popup-menu">
          <div className="popup-menu-content">
            <IoMdClose onClick={toggleMenu} className='menu-icon'/>
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/about" onClick={toggleMenu}>About</Link>
            <Link to="/service" onClick={toggleMenu}>Service</Link>
            <Link to="/blog" onClick={toggleMenu}>Blog</Link>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;