import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AboutComponent from '../components/AboutComponent';
import Nav from '../components/Navbar.ln/Nav';
import { getUserInfo, sendHistoryData } from '../utils/request';

// show summary board op when counter stop and get the
const SummaryBoard = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let remainingTime = location.state?.remaining_time;
  let violationCount = location.state?.violation_Count;

  const handleClose = () => {
    navigate('/newsession');
  };

  useEffect(() => {
    sendHistoryData(remainingTime, violationCount.toFixed(2) + '%');
    getUserInfo();
  }, []);

  return (
    <div className="bg-blue h-screen flex flex-col">
      <AboutComponent />
      <div className="pt-7">
        <Nav />
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-5 m-5 w-full max-w-xl h-1/2 w-2/3 flex flex-col justify-evenly items-center">
          <h2 className="text-4xl font-monomaniac font-bold mb-4 text-center text-white">
            SUMMARY BOARD
          </h2>
          <p className="text-xl font-monomaniac text-left text-white">
            TIME of COMPLETION: {remainingTime}
          </p>
          <p className="text-xl font-monomaniac text-left text-white">
            PERCENTAGE of BAD POSTURE: {violationCount.toFixed(2) + '%'}
          </p>
          <button
            onClick={handleClose}
            className="text-2xl font-monomaniac bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 px-7 rounded-xl border border-white transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryBoard;
