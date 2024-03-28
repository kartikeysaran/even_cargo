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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <nav>
        <div className="left">
          <img className="logo" src={ECLogo} alt="Logo" />
        </div>
        <div className="right">
          <Link to="/" onClick={scrollToTop}>Home</Link>
          <Link to="/about" onClick={scrollToTop}>About</Link>
          <Link to="/service" onClick={scrollToTop}>Service</Link>
          <Link to="/blog" onClick={scrollToTop}>Blog</Link>
          <Link to="/contact" onClick={scrollToTop}>Contact</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <IoMdMenu />
        </div>
      </nav>
      {showMenu && (
        <div className="popup-menu">
          <div className="popup-menu-content">
            <IoMdClose onClick={toggleMenu} className='menu-icon'/>
            <Link to="/" onClick={() => {toggleMenu(); scrollToTop();}}>Home</Link>
            <Link to="/about" onClick={() => {toggleMenu(); scrollToTop();}}>About</Link>
            <Link to="/service" onClick={() => {toggleMenu(); scrollToTop();}}>Service</Link>
            <Link to="/blog" onClick={() => {toggleMenu(); scrollToTop();}}>Blog</Link>
            <Link to="/contact" onClick={() => {toggleMenu(); scrollToTop();}}>Contact</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;