import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiLayoutGridLine, RiRobot2Line, RiBarChartBoxLine, RiMapPin2Line, RiMoneyDollarCircleLine, RiSettings4Line, RiMoonLine, RiUpload2Line } from 'react-icons/ri';
import { useUser } from '../context/UserContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType } = useUser();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="h-full w-full bg-white border-r border-gray-200 py-6 flex flex-col overflow-y-auto">
      <div className="px-6 mb-8">
        <button onClick={handleLogoClick} className="flex items-center gap-2">
          <img src="src\assets\running-icon-illustration-symbol-vector-removebg-preview.png" alt="Athlixir" className="w-8 h-8" />
          <span className="text-xl font-semibold text-yellow-400">Athlixir</span>
        </button>
      </div>

      <nav className="space-y-1 px-3">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
            isActive('/dashboard') || isActive('/profile')
              ? 'text-yellow-400 bg-yellow-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <RiLayoutGridLine className="w-5 h-5 shrink-0" />
          <span className="truncate">Dashboard</span>
        </Link>

        <Link
          to="/ai-assistant"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            isActive('/ai-assistant')
              ? 'text-yellow-400 bg-yellow-50 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <RiRobot2Line className="w-5 h-5 shrink-0" />
          <span className="truncate">AI Assistant</span>
        </Link>

        {userType === 'ATHLETE' && (
          <Link
            to="/document-upload"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive('/document-upload')
                ? 'text-yellow-400 bg-yellow-50 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <RiUpload2Line className="w-5 h-5 shrink-0" />
            <span className="truncate">Document Upload</span>
          </Link>
        )}

        {userType === 'ATHLETE' && (
          <Link
            to="/report-analytics"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive('/report-analytics')
                ? 'text-yellow-400 bg-yellow-50 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <RiBarChartBoxLine className="w-5 h-5 shrink-0" />
            <span className="truncate">Report Analytics</span>
          </Link>
        )}

        <Link
          to="/health-centers"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            isActive('/health-centers')
              ? 'text-yellow-400 bg-yellow-50 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <RiMapPin2Line className="w-5 h-5 shrink-0" />
          <span className="truncate">Health Centers</span>
        </Link>

        <Link
          to="/funding-support"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            isActive('/funding-support')
              ? 'text-yellow-400 bg-yellow-50 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <RiMoneyDollarCircleLine className="w-5 h-5 shrink-0" />
          <span className="truncate">Funding Support</span>
        </Link>
      </nav>

      <div className="mt-auto px-3 pt-6 border-t border-gray-100">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            isActive('/settings')
              ? 'text-yellow-400 bg-yellow-50 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <RiSettings4Line className="w-5 h-5 shrink-0" />
          <span className="truncate">Settings</span>
        </Link>

        <button className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg w-full mt-1">
          <RiMoonLine className="w-5 h-5 shrink-0" />
          <span className="truncate">Dark Mode</span>
          <div className="ml-auto shrink-0">
            <div className="w-8 h-4 bg-gray-200 rounded-full relative">
              <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
