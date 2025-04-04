import React from 'react';
import { RiSearchLine, RiNotification3Line } from 'react-icons/ri';
import Layout from '../components/Layout';

const fundingData = [
  {
    trustName: 'National Sports Trust',
    supportType: 'Injury Recovery Grant',
    applicationDeadline: '10th April 2025',
    location: 'New Delhi',
    status: false
  },
  {
    trustName: 'Runner\'s Foundation',
    supportType: 'Travel & Nutrition Aid',
    applicationDeadline: '10th May 2025',
    location: 'Chennai',
    status: true
  },
  {
    trustName: 'WrestleStrong Trust',
    supportType: 'Equipment Sponsorship',
    applicationDeadline: '25th June 2025',
    location: 'Jaipur',
    status: true
  },
  {
    trustName: 'Lift4Life Trust',
    supportType: 'Strength Training Funds',
    applicationDeadline: '12th July 2025',
    location: 'Lucknow',
    status: true
  },
  {
    trustName: 'Gymnast Edge Trust',
    supportType: 'Coaching Program Grant',
    applicationDeadline: '15th August 2025',
    location: 'Guwahati',
    status: false
  },
  {
    trustName: 'Boxing Boost Fund',
    supportType: 'Monthly Stipend Support',
    applicationDeadline: '30th August 2025',
    location: 'Raipur',
    status: true
  },
  {
    trustName: 'Victory Path Foundation',
    supportType: 'Mental Health & Wellness Support',
    applicationDeadline: '18th May 2025',
    location: 'Pune',
    status: false
  }
];

const FundingSupport = () => {
  return (
    <Layout>
      <div>
        {/* Header */}
        <header className="bg-white py-4 px-8 flex items-center justify-between border-b sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-[#2D3748]">Funding Support</h1>
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
              />
            </div>

            {/* Notification */}
            <button className="text-gray-600 hover:text-gray-800">
              <RiNotification3Line className="w-6 h-6" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <img
                src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                alt="Hima Das"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-sm font-medium">Hima Das</p>
                <p className="text-xs text-gray-500">Sprinter</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-[#F8F9FB] rounded-t-lg text-sm font-medium text-[#94A3B8]">
              <div>Trust Name</div>
              <div>Support Type</div>
              <div>Application Deadline</div>
              <div>Location</div>
              <div>Request Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#F1F5F9]">
              {fundingData.map((item, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 items-center">
                  <div className="font-medium text-[#334155]">{item.trustName}</div>
                  <div className="text-[#64748B]">{item.supportType}</div>
                  <div className="text-[#64748B]">{item.applicationDeadline}</div>
                  <div className="text-[#64748B]">{item.location}</div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={item.status}
                        className="sr-only peer"
                        readOnly
                      />
                      <div className={`w-11 h-6 bg-[#E2E8F0] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${item.status ? 'peer-checked:bg-[#F7B614]' : ''}`}></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default FundingSupport;
