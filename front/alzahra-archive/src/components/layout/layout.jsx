import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { UserContext } from "../layout/context";
import { API_BASE_URL } from "../../config";
import axios from "axios";

export const Layout = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
  const [isStaff, setIsStaff] = useLocalStorage("is_staff", null);
  const [username, setUsername] = useLocalStorage("username", null);
  

  const handleLogin = async (email, password) => {
    
    try {
      const response = await axios.post(
        `http://${API_BASE_URL}/accounts/api/v1/login/`,
        {
          email,
          password,
        }
      );

      const { access, refresh, is_staff, username } = response.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      setIsStaff(is_staff);
      setUsername(username);
      
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response && error.response.status === 400
          ? "Invalid username or password. Please try again."
          : "Login failed. Please check your network connection and try again.";

      throw new Error(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://${API_BASE_URL}/accounts/api/v1/logout/`,
        { refresh: refreshToken }, 
        {
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${accessToken}`, 
          },
        }
      );

      if (response.status === 204) {
        
        setAccessToken(null);
        setRefreshToken(null);
        setUsername(null);
        setIsStaff(null);
        localStorage.clear();
        
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const context = {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    username,
    setUsername,
    isStaff,
    setIsStaff,
    handleLogin,
    handleLogout,
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
