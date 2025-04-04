import { useState } from 'react';
import { RiSearchLine, RiBellLine, RiUploadCloud2Line, RiFileTextLine, RiDownloadLine, RiFilter3Line } from 'react-icons/ri';
import Layout from '../components/Layout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ReportAnalytics = () => {
  const labels = [
    'Jan23', 'Feb23', 'Mar23', 'Apr23', 'May23', 'Jun23', 'Jul23', 
    'Aug23', 'Sep23', 'Oct23', 'Nov23', 'Dec23', 'Jan24', 'Mar24', 
    'Apr24', 'May24', 'Jun24'
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Medical Analytics',
        data: [100, 120, 80, 90, 1200, 400, 300, 1800, 1600, 1400, 1200, 
              1600, 1800, 1400, 800, 400, 800],
        borderColor: '#FCD34D',
        backgroundColor: 'rgba(252, 211, 77, 0.2)',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Medical Analytics',
        align: 'start',
        color: '#FCD34D',
        font: {
          size: 16,
          weight: 'normal',
        },
        padding: {
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 2000,
        ticks: {
          stepSize: 200,
          color: '#9CA3AF',
        },
        grid: {
          color: '#F3F4F6',
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <Layout>
      <div>
        {/* Header */}
        <header className="bg-white py-4 px-8 flex items-center justify-between border-b sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-[#2D3748]">Report Analytics</h1>
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
        <div className="p-8">
          <div className="bg-white rounded-lg p-6">
            <div className="h-[400px]">
              <Line options={options} data={data} />
            </div>

            <div className="flex gap-4 mt-8">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50">
                <RiUploadCloud2Line className="w-5 h-5" />
                <span>Upload New Report</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50">
                <RiFileTextLine className="w-5 h-5" />
                <span>View Full Report Analytics</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50">
                <RiDownloadLine className="w-5 h-5" />
                <span>Download Monthly Summary (PDF)</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 ml-auto">
                <RiFilter3Line className="w-5 h-5" />
                <span>Filters by date/type/status</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportAnalytics;
