import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { UserContext } from "../layout/context";
import {API_BASE_URL} from "../../config" 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Layout = ({ children }) => {

  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
  const [isStaff, setIsStaff] = useLocalStorage("is_staff", null);
  const [username, setUsername] = useLocalStorage("username", null);
  //const navigate = useNavigate();

  const handleLogin = async (email,password) => {
    //e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/login/`,
        {
          email,
          password,
        }
      );

      const { access, refresh, is_staff, username } = response.data;
      setAccessToken( access);
      setRefreshToken( refresh);
      setIsStaff( is_staff);
      setUsername( username);
      //navigate("/home");
    } catch (error) {
      // Handling login failure
      console.error("Login failed:", error);
      //etError("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/logout/`,
        { refresh: refreshToken }, // Send refresh token in the body
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          },
        }
      );

      if (response.status === 204) {
        // If the logout is successful, clear local storage and redirect to login page
        setAccessToken(null);
        setRefreshToken(null);
        setUsername(null);
        setIsStaff(null);
        localStorage.clear();
        //navigate("/login");
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



