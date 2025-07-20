import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Your custom CSS file
import ECLogo from '../../assets/logo.png';
import { IoMdMenu, IoMdClose } from "react-icons/io";

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

  // Combine toggle and scroll for cleaner JSX
  const handleLinkClick = () => {
    toggleMenu();
    scrollToTop();
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
          {/* --- LOGIN LINK ADDED HERE for desktop --- */}
          <Link to="/login" className="login-button">Login</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <IoMdMenu />
        </div>
      </nav>

      {showMenu && (
        <div className="popup-menu">
          <div className="popup-menu-content">
            <IoMdClose onClick={toggleMenu} className="close-icon" />
            <Link to="/" onClick={handleLinkClick}>Home</Link>
            <Link to="/about" onClick={handleLinkClick}>About</Link>
            <Link to="/service" onClick={handleLinkClick}>Service</Link>
            <Link to="/blog" onClick={handleLinkClick}>Blog</Link>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
             {/* --- LOGIN LINK ADDED HERE for mobile menu --- */}
            <Link to="/login" onClick={handleLinkClick} className="login-button-mobile">Login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;