/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { getAccessToken, setAccessToken } from '../store/AccessTokenStore';
import { getCurrentUserService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
const JWT_TOKEN_KEY = "accessToken";

export const AuthContext = createContext();

 const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
 

  const navigate = useNavigate();

  const getCurrentUser = (callback) => {
    getCurrentUserService()
      .then((res) => {
        
        setCurrentUser(res);
        setIsAuthLoaded(true);

        callback && callback();
      });
  }
  const login = (token) => {
    const navigateToProfile = () => {
      navigate('/dashboard');
    }
    
    setAccessToken(token);
    getCurrentUser(navigateToProfile);
  }
  useEffect(() => {
    if (getAccessToken()) {
      getCurrentUser()
    } else {
      setIsAuthLoaded(true)
    }
  }, []);

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(JWT_TOKEN_KEY);
    window.location.assign("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isAuthLoaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
