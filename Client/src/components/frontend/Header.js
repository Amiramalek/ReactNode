// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <header className="header bg-[#fff] py-4">
      {isOpen && (
        <div className='fixed bg-[#fff] top-0 w-full h-screen z-50'>
          <div className='flex justify-center items-center h-9 w-9 m-auto mt-8 rounded-2xl text-center text-[#fff] bg-[#8B6D5C]' onClick={toggleMenu}>X</div>
          <ul className="md:hidden pt-8">
            <li className='bg-[#8B6D5C] text-[#fff] p-4 border-b-[1px]'>
              <Link to="/" onClick={() => setIsOpen(false)} className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Home</Link>
            </li>
            <li className='bg-[#8B6D5C] text-[#fff] p-4 border-b-[1px]'>
              <Link to="/about" onClick={() => setIsOpen(false)} className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">About</Link>
            </li>
            <li className='bg-[#8B6D5C] text-[#fff] p-4 border-b-[1px]'>
              <Link to="/services" onClick={() => setIsOpen(false)} className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Services</Link>
            </li>
            <li className='bg-[#8B6D5C] text-[#fff] p-4 border-b-[1px]'>
              <Link to="/faqs" onClick={() => setIsOpen(false)} className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Faq’s</Link>
            </li>
            <li className='bg-[#8B6D5C] text-[#fff] p-4'>
              <Link to="/blogs" onClick={() => setIsOpen(false)} className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Blogs</Link>
            </li>
          </ul>
        </div>
      )}
      <div className="md:container md:mx-auto px-[15px]">
        <nav className="flex justify-between items-center">
          <div className="xs:w-[110px] md:hidden">
            <button onClick={toggleMenu} className="md:hidden text-2xl focus:outline-none">
            ☰
            </button>
          </div>
          
          <div className="logo">
            <Link to="/" className="text-2xl font-bold text-black">
             <img src='/assets/images/logo.png'/>
            </Link>
          </div>
          <ul className="hidden md:flex gap-8">
            <li><Link to="/" className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Home</Link></li>
            <li><Link to="/about" className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">About</Link></li>
            <li><Link to="/services" className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Services</Link></li>
            <li><Link to="/faqs" className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Faq’s</Link></li>
            <li><Link to="/blogs" className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">Blog</Link></li>
          </ul>
          <a href="/#appointment" className="lg:text-base md:text-xs text-custom-black font-normal px-1.5">
  <button className="xs:text-[12px] lg:text-sm font-semibold text-white bg-[#8B6D5C] xs:py-4 lg:py-4 md:p-3 md:text-xs xs:px-4 md:px-8">
    Make Appointment
  </button>
</a>


        </nav>
      </div>
    </header>
  );
};

export default Header;
