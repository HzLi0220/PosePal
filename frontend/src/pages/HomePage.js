import React from 'react';
import mainpage from '../assets/mainpage.png';
import AboutComponent from '../components/AboutComponent';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleNewSession = () => {
    navigate('/newsession');
  };

  const handleLogin = () => {
    navigate('/sign-up');
  };
  return (
    <div className="bg-blue h-screen flex flex-col items-center justify-center">
      <AboutComponent />
      <img src={mainpage} alt="mainpage" className="object-cover w-2/3" />
      <div className="font-monomaniac font-bold w-full flex justify-evenly">
        <button
          onClick={handleNewSession}
          className="text-3xl bg-blue border border-white px-7 py-4 rounded-xl text-white"
        >
          new session
        </button>
        <button
          onClick={handleLogin}
          className="text-3xl bg-blue border border-white px-14 py-3 rounded-xl text-white"
        >
          login
        </button>
      </div>
    </div>
  );
};

export default Home;
