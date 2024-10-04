import  { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

// Create Context
export const AuthContext = createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {}
});

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Handle Login
  const handleLogin = (token) => {
    try {
      const decodedUser = jwt_decode(token);
      localStorage.setItem('userId', decodedUser.sub);
      localStorage.setItem('userRole', decodedUser.roles);
      localStorage.setItem('token', token);
      setUser(decodedUser);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes Validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
