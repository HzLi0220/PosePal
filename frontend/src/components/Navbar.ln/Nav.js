import React from 'react';
import { useNavigate } from 'react-router-dom';
function Nav() {
  const navigate = useNavigate();
  const handleNewSession = () => {
    navigate('/newsession');
  };

  const handleHistory = () => {
    navigate('/history');
  };

  return (
    <div className="font-monomaniac font-bold w-full flex justify-evenly">
      <button
        onClick={handleNewSession}
        className="text-3xl bg-blue border border-white px-7 py-4 rounded-xl text-white hover:bg-pink-500 transition-colors duration-300"
      >
        New Session
      </button>
      <button
        onClick={handleHistory}
        className="text-3xl bg-blue border border-white px-14 py-3 rounded-xl text-white hover:bg-pink-500 transition-colors duration-300"
      >
        History
      </button>
    </div>
  );
}

export default Nav;
