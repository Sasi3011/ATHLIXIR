import React, { useState } from 'react';
import { RiSearchLine, RiBellLine } from 'react-icons/ri';
import Layout from '../components/Layout';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Biography');

  const tabs = [
    'Biography',
    'Medical History',
    'Medical Reports',
    'Competition History',
    'Training Centers',
    'Language',
    'Contact & Socials',
    'Interest',
    'Recommendation'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white py-4 px-8 flex items-center justify-between border-b sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-[#2D3748]">Profile</h1>
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
              <div className="flex flex-col items-end">
                <span className="font-medium text-sm">Hima Das</span>
                <span className="text-xs text-gray-500">Sprinter</span>
              </div>
              <img
                src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-6">
                  <img
                    src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                    alt="Hima Das"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold mb-1">Hima Das</h2>
                    <p className="text-gray-500">Sprinter</p>
                  </div>
                </div>
                <button className="bg-yellow-400 text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                  Medical Reports
                </button>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Email Address</h3>
                  <p className="font-medium">himadas@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Phone Number</h3>
                  <p className="font-medium">+91 63861 XXXXX</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Address</h3>
                  <p className="font-medium">Nagon, Assam</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Skill Level</h3>
                  <p className="font-medium">Professional Athlete</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="flex gap-6">
              {/* Left Sidebar */}
              <div className="w-64">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <ul className="space-y-2">
                    {tabs.map((tab) => (
                      <li key={tab}>
                        <button
                          onClick={() => setActiveTab(tab)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeTab === tab
                              ? 'bg-yellow-50 text-yellow-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {tab}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Complete Your Profile</h3>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-4/5 bg-yellow-400 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">80%</p>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'Biography' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Biography</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Dedicated athlete with a focus on maintaining optimal physical and mental health. Regular health check-ups, injury prevention, and recovery protocols are strictly followed to ensure peak performance. Committed to a healthy lifestyle and transparent health record management.
                    </p>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Medical Conditions & Alerts</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>No Chronic Illness</li>
                        <li>No Allergies</li>
                        <li>Past Injury: Ankle Sprain (Recovered)</li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Career Health Goals</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-blue-600">Injury-Free Performance</span>
                          <span className="text-blue-600">Regular Health Check-ups</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
