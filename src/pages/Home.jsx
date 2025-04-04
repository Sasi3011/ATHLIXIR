import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left Column - Text Content */}
            <div className="lg:w-1/2 max-w-2xl">
              <h1 className="text-[64px] leading-[1.2] font-bold text-[#333333]">
                One <span className="text-yellow-400">Platform</span> - Trusted
                <br />
                Athlete Health Records
              </h1>
              <p className="text-[#666666] text-lg mt-6 mb-8">
                Ensure every athlete's health journey is safe, verified, and transparent. Our AI-powered
                system simplifies medical record management while detecting forgery risks.
              </p>
              <Link
                to="/register"
                className="inline-block bg-yellow-400 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-yellow-500"
              >
                Get Started
              </Link>
            </div>

            {/* Right Column - Hero Image */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="src\assets\Screenshot_2025-03-28_103748-removebg-preview.png"
                  alt="Athletes running track"
                  className="w-full h-auto"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-12 -left-12">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full opacity-50"></div>
                </div>
                <div className="absolute -bottom-8 -right-8">
                  <div className="w-16 h-16 bg-yellow-200 rounded-full opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;