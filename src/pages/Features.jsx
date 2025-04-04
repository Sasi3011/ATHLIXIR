import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import featuresIllustration from '../assets/features-illustration.svg';

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      {/* Header Section */}
      <section className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-16">
            Features
          </h1>

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Powering Athletes with
              <br />
              Health Intelligence
            </h2>
            <p className="text-lg text-gray-600">
              We provide an end-to-end solution to manage, track, and verify athlete medical records.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">2007</div>
              <div className="text-sm text-gray-500">Medical Records Managed</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">3031</div>
              <div className="text-sm text-gray-500">Records Verified</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">54221</div>
              <div className="text-sm text-gray-500">Forgeries Detected</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">500</div>
              <div className="text-sm text-gray-500">Documents Uploaded</div>
            </div>
          </div>

          {/* Features Section */}
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="src\assets\Screenshot_2025-03-28_104428-removebg-preview.png"
                alt="ATHLIXIR Features"
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ensure Athlete Wellness with{' '}
                <span className="text-yellow-400">ATHLIXIR</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform provides smart medical insights, helping athletes and coaches
                make informed decisions. From injury history to vaccination records, everything
                is verified and safely stored. With AI-powered forgery detection, we protect
                athletes from fake documentation risks.
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-yellow-400 text-white rounded-md font-medium hover:bg-yellow-500 transition duration-150"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Features;
