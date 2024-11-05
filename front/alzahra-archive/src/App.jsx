import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ArchiveDetails from "./components/Archives/ArchiveDetails";
import Header from "./components/Header";
import BreakdownPage from "./components/Breakdown/BreakDown";
import OutputPage from "./components/Output/Output";
import Archive from "./components/Archives/Archive";
import BreakDownDetails from "./components/Breakdown/BreakDownDetails";
import OutputDetail from "./components/Output/OutputDetail";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserContext } from "./components/layout/context";
import { API_BASE_URL } from "./config";


const check_access = async (context) => {

  let access = context.accessToken;
  const refresh = context.refreshToken;
  const config = {
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
    },
  };
  try {

    if(context.accessToken == null){
      //return false
      access = ""
    }

 
    const data = {
    
      token: access,
       
      
      headers: {
        Authorization: `Bearer ${context.accessToken}`,
      },
    };
    const response = await axios.post(
      `http://${API_BASE_URL}/accounts/api/v1/verify`,
      data
    );

    if (response.status == 200) {
      return true;
    }
   
  } catch (error) {
    if (error.response && context.refreshToken) {

      
      const refresh_data = {
        data: {
          refresh: context.refreshToken,
        },
      };
      const response = await axios.post(
        `http://${API_BASE_URL}/accounts/api/v1/refresh`,
        
        refresh_data.data
      );
    
      if (response.status == 200) {
        context.setAccessToken(response.data.access);
        return true;
      } else {
        localStorage.clear();
        context.setAccessToken(null);
       
      }
    }
    console.log(error);
    context.setAccessToken(null);
  }
};

const App = () => {
  const context = React.useContext(UserContext);
  // check_access(context)
  const ProtectedRoute =  ({ element }) => {
    check_access(context)
    return context.accessToken == null ?<Login />: element
  };
// useEffect(() => {
  
//   check_access(context)

 
// }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={<ProtectedRoute element={<HomePage />} />}
        />
        <Route
          path="/home"
          element={<ProtectedRoute element={<HomePage />} />}
        />
        <Route
          path="/archive/:id"
          element={<ProtectedRoute element={<ArchiveDetails />} />}
        />
        <Route
          path="/breakdown/:id"
          element={<ProtectedRoute element={<BreakDownDetails />} />}
        />
        <Route path="/output/:id" element={<OutputDetail />} />

        <Route
          path="/archive"
          element={<ProtectedRoute element={<Archive />} />}
        />
        <Route
          path="/breakdown"
          element={<ProtectedRoute element={<BreakdownPage />} />}
        />
        <Route
          path="/output"
          element={<ProtectedRoute element={<OutputPage />} />}
        />
        <Route path="*" element={<ProtectedRoute element={<HomePage />} />} />
      </Routes>
    </Router>
  );
};

export default App;
