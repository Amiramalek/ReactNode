import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#F5F0E1' }} className='pt-12'>
      <div className='md:container md:mx-auto px-[15px]'>
        <div className='footer-main flex justify-between flex-wrap'>
          <div className='xs:w-full md:w-auto'>
            <div className='footer-logo'>
              <img src="/assets/images/logo.png" alt="Logo" />
              <p className='text[#343333] lg:text-base md:text-sm mt-4 nline-block" max-w-xs mt-5'>It is a long established fact that a reader will be distracted by the readable content of a page distribution.</p>
            </div>
          </div>
          <div className='xs:pt-6 md:pt-0'>
            <div className='footer-heading'>
              <h2 className='text-2xl font-semibold mb-5'>Main Menu</h2>
              <ul>
                <li>
                  <Link  className="text[#343333] text-base mb-4 block" to="/">Home</Link>
                </li>
                <li>
                  <Link className="text[#343333] text-base mb-4 block" to="/about">About Us</Link>
                </li>
                <li>
                  <Link className="text[#343333] text-base mb-4 block" to="/faqs">Faq’s</Link>
                </li>
                <li>
                  <Link className="text[#343333] text-base block" to="/blogs">Blogs</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='xs:pt-6 md:pt-0'>
            <div className='footer-heading'>
              <h2 className='text-2xl font-semibold mb-5'>Quick Links</h2>
              <ul>
                <li>
                  <Link  className="text[#343333] text-base mb-4 block" to="/terms-of-service">Terms of Service</Link>
                </li>
                <li>
                  <Link className="text[#343333] text-base mb-4 block" to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="text[#343333] text-base block" to="/return-policy">Return Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='xs:pt-6 md:pt-0'>
            <div className='footer-heading'>
              <h2 className='text-2xl font-semibold mb-5'>Customer Care</h2>
              <ul>
                <li>
                  <Link  className="text[#343333] text-base mb-4 block" to="tel:+11234567890"> +1 123 456 7890</Link>
                </li>
                <li>
                  <Link className="text[#343333] text-base block" to="mailto:info@gmail.com">info@gmail.com</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright bg-[#8B6D5C] py-4 mt-12'>
        <p className='text-center text-white'>© 2025  All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
