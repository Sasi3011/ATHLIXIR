import { Link } from 'react-router-dom';
import benefitsIllustration from '../assets/benefits-illustration.svg';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About ATHLIXIR
          </h1>
          <h2 className="text-2xl text-gray-600 mb-6">
            One Platform, Every Athlete's Success!
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            ATHLIXIR is built to help athletes, coaches, and organizations maintain and verify health records. Our
            platform simplifies medical document management, ensures data privacy, and uses AI to detect fake or
            manipulated records — all in one place.
          </p>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">
            Who Can Benefit from ATHLIXIR?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Athletes */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#FFB800"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Athletes</h3>
              <p className="text-gray-600 text-sm">
                Securely manage personal medical records, injury history, and health progress in one place.
              </p>
            </div>

            {/* Athletic Organizations */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19Z" fill="#FFB800"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Athletic Organizations<br />& Communities
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor and maintain athletes' health data across teams & events easily.
              </p>
            </div>

            {/* Coaches & Medical Staff */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19ZM17 12H7V14H17V12Z" fill="#FFB800"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Coaches & Medical<br />Staff
              </h3>
              <p className="text-gray-600 text-sm">
                Get instant access to verified injury records & health stats for better decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ATHLIXIR Stands Out Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={benefitsIllustration}
                alt="ATHLIXIR Benefits"
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Why ATHLIXIR Stands Out?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="ml-2 text-gray-600">Detect forged or tampered athlete health records.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="ml-2 text-gray-600">Securely store and encrypt all athlete medical data.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="ml-2 text-gray-600">Instant alerts for missing, outdated, or suspicious health records.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="ml-2 text-gray-600">Empower every athlete with accurate, verified health information.</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-600">
                Join ATHLIXIR & safeguard every athlete's health journey—because well-being drives winning.
              </p>
              <Link
                to="/register"
                className="inline-block mt-8 px-8 py-3 bg-yellow-400 text-white rounded-md font-medium hover:bg-yellow-500 transition duration-150"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
