import React from 'react';
import './App.css';
import Navbar from './components/Navbar.ln';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewSession from './pages/NewSessionPage';
import SignUp from './pages/SignUpPage';
import History from './pages/HistoryPage';
import SummaryBoard from './components/SummaryBoardComponent';
import 'nes.css/css/nes.min.css';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/newsession" element={<NewSession />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/summary" element={<SummaryBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
