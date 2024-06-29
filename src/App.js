import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './components/LoginSignUp';
import Homepage from './components/HomePage';
import PageDetails from './components/PageDetails';


const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path = "/" element={<LoginSignup/>} />
          <Route path = "/home" element={<Homepage/>} />
          <Route path="/details/:id" element={<PageDetails/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
