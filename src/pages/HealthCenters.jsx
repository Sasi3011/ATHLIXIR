import React from 'react';
import { useState } from 'react';
import { RiSearchLine, RiBellLine, RiStarFill, RiMapPinLine, RiTimeLine, RiGlobalLine, RiArrowRightSLine } from 'react-icons/ri';
import Layout from '../components/Layout';

const HealthCenters = () => {
  const healthCenters = [
    {
      id: 1,
      name: 'Primary health center',
      type: 'Medical Center',
      address: '225/4-PG2, Ground Main Rd',
      hours: 'Open - Closes 8 pm',
      rating: 0,
      reviews: 'No reviews',
    },
    {
      id: 2,
      name: 'Health center,gandhipudur',
      type: 'Hospital',
      address: 'Gandhipudur, 2nd street, post',
      rating: 5,
      reviews: '(4)',
    },
    {
      id: 3,
      name: 'KOVAI HEALTH CENTER',
      type: 'Medical Center',
      address: 'No.12, 3rd Street, NSR, 2nd Floor, Fathima Masjid, Dr Nanjappa Rd, opp. traffic womens police station',
      hours: 'Open - Closes 7 pm',
      rating: 5,
      reviews: '(51)',
      phone: '075397 42519',
    },
    {
      id: 4,
      name: 'Urban Primary Health Center',
      type: 'Hospital',
      address: '224MA-JV',
      hours: 'Open now',
      rating: 0,
      reviews: 'No reviews',
    },
    {
      id: 5,
      name: 'Chakravarthi Medical Centre',
      rating: 4.8,
      reviews: '(77)',
    },
  ];

  return (
    <Layout>
      <div>
        {/* Header */}
        <header className="bg-white py-4 px-8 flex items-center justify-between border-b sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-[#2D3748]">Health Centers</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
              />
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <RiBellLine className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8 flex gap-8">
          {/* Left Panel */}
          <div className="w-[400px] bg-white rounded-lg p-4 h-fit">
            <div className="relative mb-4">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="health center"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Results</span>
              <button className="text-sm text-gray-600 hover:text-gray-800">
                <RiSearchLine className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {healthCenters.map((center) => (
                <div key={center.id} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-[#2D3748] mb-1">{center.name}</h3>
                      {center.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <RiStarFill
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(center.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500">{center.reviews}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">{center.reviews}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <RiGlobalLine className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <RiArrowRightSLine className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {(center.type || center.address) && (
                    <div className="text-sm text-gray-500 mb-2">
                      {center.type && <div>{center.type}</div>}
                      {center.address && (
                        <div className="flex items-start gap-1">
                          <RiMapPinLine className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{center.address}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {center.hours && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <RiTimeLine className="w-4 h-4" />
                      <span>{center.hours}</span>
                    </div>
                  )}
                  {center.phone && (
                    <div className="text-sm text-gray-500 mt-1">{center.phone}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 bg-white rounded-lg p-4">
            <div className="w-full h-[calc(100vh-180px)] bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15664.936555393947!2d77.12345!3d11.12345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12 bg-white border-t">
          <h2 className="text-2xl font-semibold mb-2">
            Find the Best Health Center with <span className="text-yellow-400">ATHLIXIR</span>!
          </h2>
          <p className="text-gray-600 mb-6">
            Find the 24/7 hospitals that meets your needs and provide best services near you!!
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-600">
              Own a Training Academy? Join <span className="text-yellow-400">ATHLIXIR</span> and get discovered by thousands of athletes worldwide!
            </p>
            <button className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthCenters;
