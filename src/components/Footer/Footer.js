import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer-container'>
      <div>
        <h3>Contact Us</h3>
        <div className='footer-container-row'>
          <LuPhone />
          <h6>+91 93101 56985</h6>
        </div>
        <div className='footer-container-row'>
          <CiMail />
          <h6>contact@evencargo.in</h6>
        </div>
        <div className='footer-container-row'>
          <GrLocation />
          <h6>630, Lane no 4, Westend Marg, Saket ,New Delhi – 110030</h6>
        </div>
      </div>
      <div className='footer-container-quick'>
        <h3>Quick Links</h3>
        <Link to='/' className='footer-container-link'>Home</Link>
        <Link to='/about' className='footer-container-link'>About</Link>
        <Link to='/service' className='footer-container-link'>Services</Link>
        <Link to='/blog' className='footer-container-link'>Blog</Link>
        <Link to='/contact' className='footer-container-link'>Contact</Link>
      </div>
      <div>
        <h3>Follow Us</h3>
        <div className='footer-container-follow'>
          <a href='https://www.linkedin.com/company/even-cargo/' target='_blank' rel='noopener noreferrer'>
            <FaLinkedinIn/>
          </a>
          <a href='https://www.instagram.com/even_cargo/' target='_blank' rel='noopener noreferrer'>
            <RiInstagramFill />
          </a>
          <a href='https://twitter.com/EvenCargo' target='_blank' rel='noopener noreferrer'>
            <FaTwitter />
          </a>
          <a href='https://www.facebook.com/evencargo/' target='_blank' rel='noopener noreferrer'>
            <FaFacebookF />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer