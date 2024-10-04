import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ArchiveDetails from './components/Archives/ArchiveDetails';
import Header from './components/Header';
import BreakdownPage from './components/Breakdown/BreakDown'; 
import OutputPage from './components/Output/Output'; 
import Archive from './components/Archives/Archive';
import BreakDownDetails from './components/Breakdown/BreakDownDetails';
import OutputDetail from './components/Output/OutputDetail';
import 'react-toastify/dist/ReactToastify.css';


const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken; 
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/home"
          element={<ProtectedRoute element={<HomePage />} />}
        />
        <Route path="/archive/:id" element={<ArchiveDetails />} />
        <Route path='/breakdown/:id' element={<BreakDownDetails />}/>
        <Route path='/output/:id' element={<OutputDetail />}/>
        
        <Route path="/archive" element={<ProtectedRoute element={<Archive />} />} />
        <Route path="/breakdown" element={<ProtectedRoute element={<BreakdownPage />} />} />
        <Route path="/output" element={<ProtectedRoute element={<OutputPage />} />} />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
