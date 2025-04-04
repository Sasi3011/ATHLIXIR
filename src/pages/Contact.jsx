import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import contactSupport from '../assets/contact-support.jpg';
import partner from '../assets/partner.jpg';
import technicalSupport from '../assets/technical-support.jpg';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Stay Connected with <span className="text-yellow-400">ATHLIXIR</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Got questions? Need support? We're here to help! Whether you're an athlete,
            coach, or reach out and let's elevate your performance together.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={contactSupport}
              alt="Contact Support"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Need Help with Health Records & Injury Management?
              </h3>
              <Link
                to="/contact/form"
                className="text-yellow-400 hover:text-yellow-500 font-medium inline-flex items-center"
              >
                Contact Support
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={partner}
              alt="Partner with ATHLIXIR"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Partner with ATHLIXIR
              </h3>
              <Link
                to="/contact/form"
                className="text-yellow-400 hover:text-yellow-500 font-medium inline-flex items-center"
              >
                Join Us
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={technicalSupport}
              alt="Technical Support"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Technical Assistance & Troubleshooting
              </h3>
              <Link
                to="/contact/form"
                className="text-yellow-400 hover:text-yellow-500 font-medium inline-flex items-center"
              >
                Get Help
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            We're just a <span className="text-yellow-400">message</span> away!
            <br />
            Let's <span className="text-yellow-400">connect</span> and build
            <br />
            <span className="text-yellow-400">success</span> together.
          </h2>
          <Link
            to="/contact/form"
            className="inline-block px-8 py-3 bg-yellow-400 text-white rounded-md font-medium hover:bg-yellow-500 transition duration-150"
          >
            Get In Touch →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
