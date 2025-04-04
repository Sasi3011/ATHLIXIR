import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* About ATHLIXIR Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-[#333333] mb-4">About ATHLIXIR</h2>
          <h3 className="text-2xl text-[#666666] mb-6">One Platform, Every Athlete's Success!</h3>
          <p className="text-[#666666] text-lg leading-relaxed">
            ATHLIXIR is built to help athletes, coaches, and organizations maintain and verify health records. Our
            platform simplifies medical document management, ensures data privacy, and uses AI to detect fake or
            manipulated records — all in one place.
          </p>
        </div>
      </div>

      {/* Who Can Benefit Section */}
      <div className="py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-[#333333] text-center mb-16">
            Who Can Benefit from ATHLIXIR?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Athletes */}
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center">
                <img src="/icons/athletes.svg" alt="Athletes" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Athletes</h3>
              <p className="text-[#666666]">
                Securely manage personal medical records, injury history, and health progress in one place.
              </p>
            </div>

            {/* Athletic Organizations */}
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center">
                <img src="/icons/organizations.svg" alt="Organizations" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">
                Athletic Organizations & Communities
              </h3>
              <p className="text-[#666666]">
                Monitor and maintain athletes' health data across teams & events easily.
              </p>
            </div>

            {/* Coaches & Medical Staff */}
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center">
                <img src="/icons/coaches.svg" alt="Coaches" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">
                Coaches & Medical Staff
              </h3>
              <p className="text-[#666666]">
                Get instant access to verified injury records & health stats for better decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why ATHLIXIR Stands Out Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <img src="src\assets\Screenshot_2025-03-28_104049-removebg-preview (1).png" alt="Why ATHLIXIR" className="w-full" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-semibold text-[#333333] mb-8">
                Why ATHLIXIR Stands Out?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-[#666666]">Detect forged or tampered athlete health records.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-[#666666]">Securely store and encrypt all athlete medical data.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-[#666666]">Instant alerts for missing, outdated, or suspicious health records.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-[#666666]">Empower every athlete with accurate, verified health information.</span>
                </li>
              </ul>
              <p className="mt-6 text-[#666666]">
                Join ATHLIXIR & safeguard every athlete's health journey—because well-being drives winning.
              </p>
              <button className="mt-8 bg-yellow-400 text-white px-8 py-3 rounded-md font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
