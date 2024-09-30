import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ArchiveDetails from './components/ArchiveDetails';
import Header from './components/Header';
import AddFile from './components/AddFile';

const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken; 
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
          element={<HomePage />}
        />
        <Route path="/archive/:id" element={<ArchiveDetails />} />
        <Route
          path="/addfile"
          element={<AddFile />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
