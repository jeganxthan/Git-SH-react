import React, { useState, useEffect, createContext } from 'react';
import axiosInstance from '../constants/axiosInstance';
import { API_PATHS } from '../constants/apiPaths';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const updateUser = (userData) => {
    setUser(userData);
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
      setToken(userData.token);
    }
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;