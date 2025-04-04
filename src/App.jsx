import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import HealthCenters from './pages/HealthCenters';
import ReportAnalytics from './pages/ReportAnalytics';
import FundingSupport from './pages/FundingSupport';
import DocumentUpload from './pages/DocumentUpload';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Features from './pages/Features';
import ContactUs from './pages/ContactUs';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/document-upload" element={<ProtectedRoute><DocumentUpload /></ProtectedRoute>} />
          <Route path="/health-centers" element={<ProtectedRoute><HealthCenters /></ProtectedRoute>} />
          <Route path="/report-analytics" element={<ProtectedRoute><ReportAnalytics /></ProtectedRoute>} />
          <Route path="/funding-support" element={<ProtectedRoute><FundingSupport /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;