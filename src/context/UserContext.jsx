import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState('USER'); // 'USER' or 'ATHLETE'

  useEffect(() => {
    // Check if there's a logged-in user and set their type
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserType(userData.type);
    }
  }, []);

  const value = {
    userType,
    setUserType,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
