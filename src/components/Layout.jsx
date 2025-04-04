import React from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isPublicPage = ['/login', '/register', '/about', '/contact', '/'].includes(location.pathname);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <div className="fixed top-0 left-0 h-screen w-64 z-30">
        <Sidebar />
      </div>
      <div className="flex-1 pl-64">
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
