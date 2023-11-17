import React from 'react'
import './Contact.css'
import DeliveryImage from '../../assets/delivery-contact.png'
import { FaArrowRight } from "react-icons/fa";

const Contact = () => {
  return (
    <div className='contact-container'>
      <div className='contact-container__form-container'>
        <h1>
          Love to hear from you,<br />
          Get in touch<span> </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="37" viewBox="0 0 33 37" fill="none">
            <path
              d="M32.6012 16.7887C32.6012 16.7887 33.7937 15.0336 32.0544 13.8306C30.3172 12.6276 29.1257 14.3827 29.1257 14.3827L23.5939 22.5283C23.4042 22.207 23.1946 21.8901 22.9628 21.5773L30.6406 10.2716C30.6406 10.2716 31.8321 8.51758 30.0939 7.31457C28.3567 6.11049 27.1652 7.86555 27.1652 7.86555L19.9425 18.4991C19.6738 18.2768 19.3999 18.0555 19.1155 17.8375L27.4876 5.50952C27.4876 5.50952 28.6791 3.75552 26.9419 2.55251C25.2047 1.34843 24.0132 3.10349 24.0132 3.10349L15.64 15.4304C15.3324 15.2389 15.028 15.074 14.7235 14.9007L22.5478 3.37898C22.5478 3.37898 23.7392 1.62499 22.001 0.421974C20.2638 -0.782101 19.0723 0.972958 19.0723 0.972958L10.7982 13.1552L10.1356 14.1316L9.54034 15.0092C14.753 18.6182 15.2492 25.4108 12.271 29.7963C11.6747 30.6739 10.8066 30.0729 10.8066 30.0729C14.3811 24.8088 13.2886 18.8937 8.07493 15.2847L9.61513 7.51773C9.61513 7.51773 10.1893 5.47016 8.16237 4.89046C6.13546 4.31076 5.56131 6.35726 5.56131 6.35726L3.78618 11.6799C3.08245 13.7902 2.33342 15.8931 1.34209 17.8811C-1.45703 23.4973 0.214858 30.4781 5.49389 34.1329C11.2512 38.1185 19.1208 36.6379 23.0692 30.8249C23.2778 30.5164 23.4527 30.2154 23.6192 29.9144L23.6655 29.9474L32.6012 16.7887Z"
              fill="#D99E82"
            />
          </svg>
        </h1>

        {/* Form */}
        <form className='contact-us_form' action="https://formspree.io/f/mpzgejdg" method="POST">
          <div style={{display:'flex'}}>
            <input type="text" id="name" name="name" placeholder='Your Name'/>
            <input type="email" id="email" name="email" placeholder='Email'/>
          </div>

          <div>
            
          </div>

          <div>
            {/* Updated dropdown with placeholder */}
            <select id="lookingFor" name="lookingFor">
              <option value="" disabled selected hidden>
                What are you looking for?
              </option>
              <option value="partner">Become our partner</option>
              <option value="community">Join our community</option>
              <option value="other">Anything else</option>
            </select>
          </div>

          <div>
            <textarea id="message" name="message" rows="4" placeholder='Message'/>
          </div>
          <button type='submit'>Submit <FaArrowRight /></button>
        </form>
      </div>

      <div>
        {/* Add your DeliveryImage here */}
        <img src={DeliveryImage} alt='delivery_girl'/>
      </div>
    </div>
  );
};

export default Contact;
