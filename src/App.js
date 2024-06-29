import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './components/LoginSignUp';
import HomePage from './components/HomePage';
import PageDetails from './components/PageDetails';


const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path = "/" element={<LoginSignup/>} />
          <Route path = "/Home" element={<HomePage/>} />
          <Route path="/details/:id" element={<PageDetails/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
