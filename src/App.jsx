import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';

import './App.css';
import userPool from './userPool';

function App() {
  useEffect(() => {
    const user = userPool.getCurrentUser();
    if (user) {
      <Navigate to="/dashboard" replace />;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
