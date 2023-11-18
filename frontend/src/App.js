import React from 'react';
import './App.css';
import Navbar from './components/Navbar.ln';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Newsession from './pages/newsession';
import SignUp from './pages/signup';
import History from './pages/history';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/newsession' element={<Newsession />} />
        <Route path='/history' element={<History />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
