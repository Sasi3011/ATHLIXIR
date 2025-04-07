import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/running-icon-illustration-symbol-vector-removebg-preview.png";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="ATHLIXIR" className="h-8" />
          <span className="text-xl font-semibold text-[#333333]">ATHLIXIR</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-[#333333] hover:text-yellow-400">
            Home
          </Link>
          <Link to="/about-us" className="text-[#333333] hover:text-yellow-400">
            About Us
          </Link>
          <Link to="/features" className="text-[#333333] hover:text-yellow-400">
            Features
          </Link>
          <Link to="/contact-us" className="text-[#333333] hover:text-yellow-400">
            Contact Us
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-[#333333] hover:text-yellow-400">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
