import React from 'react';
import CameraComponent from '../components/CameraComponent';
import Nav from '../components/Navbar.ln/Nav';
import AboutComponent from '../components/AboutComponent';

const NewSession = () => {
  return (
    <div className="bg-blue h-screen">
      <AboutComponent />
      <div className="pt-5">
        <Nav />
      </div>

      <div className="flex items-center justify-center flex w-full flex justify-evenly mt-10">
        <CameraComponent />
      </div>
    </div>
  );
};

export default NewSession;
