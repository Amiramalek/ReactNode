// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <section className="top-header bg-[#8B6D5C] py-2">
      <div className="container mx-auto px-[15px]">
        <div className="announcement-bar flex xs:flex-col md:flex-row justify-between items-center">
          <div className="left-bar">
            <ul className="flex gap-16 items-center">
              <li>
                <Link to="tel:11234567890" className="flex items-center gap-2 lg:text-base md:text-xs xs:text-xs text-white">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/phone.png`}
                    alt="Phone"
                  />
                  +1 123 456 7890
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-2 lg:text-base md:text-xs xs:text-xs text-white">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/timer.png`}
                    alt="Working Hours"
                  />
                  Monday - Friday 10:00 to 6:00
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-bar xs:pt-4 md:pt-0">
            <ul className="flex justify-between items-center gap-4">
              <li>
                <Link to="https://www.instagram.com/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/insta.png`}
                    alt="Instagram"
                  />
                </Link>
              </li>
              <li>
                <Link to="https://www.facebook.com/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/facebook.png`}
                    alt="Facebook"
                  />
                </Link>
              </li>
              <li>
                <Link to="https://www.youtube.com/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/yt.png`}
                    alt="YouTube"
                  />
                </Link>
              </li>
              <li>
                <Link to="https://www.linkedin.com/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/in.png`}
                    alt="LinkedIn"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
