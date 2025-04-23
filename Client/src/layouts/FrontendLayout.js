import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/frontend/topbar';
import Header from '../components/frontend/Header';
import Footer from '../components/frontend/Footer';
import ScrollToTop from '../pages/frontend/ScrollToTop';

const FrontendLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <TopBar />
      <Header />
      <main style={{ padding: '0' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default FrontendLayout;
