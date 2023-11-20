import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryCard from '../components/HistoryCard'; // Import the Card component
import Nav from '../components/Navbar.ln/Nav';
import AboutComponent from '../components/AboutComponent';

const HistoryPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert(
        'you are not signed in yet \nplease become a user before any further action:>'
      );
      navigate('/sign-up');
      return;
    }
  }, [navigate]);

  // Conditional rendering
  let historyItems = null;
  console.log(user);
  console.log(user.history);
  if (user && user.history) {
    // Check if userData and userData.history are not null
    historyItems = JSON.parse(user.history).map((item, index) => (
      <HistoryCard
        key={index}
        duration={item.duration}
        percentage={item.percentage}
      />
    ));
  }

  return (
    <div className="bg-blue min-h-screen">
      <AboutComponent></AboutComponent>
      <div className="pt-7">
        <Nav></Nav>
      </div>
      <div>{historyItems}</div>
    </div>
  );
};

export default HistoryPage;
