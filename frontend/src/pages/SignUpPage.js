import React, { useState } from 'react';
import RegisterComponent from '../components/RegisterComponent';
import LoginComponent from '../components/LoginComponent';
import AboutComponent from '../components/AboutComponent';

const SignUp = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-teal h-screen font-monomaniac flex flex-col items-center">
      <AboutComponent />
      <div className="flex w-full justify-center p-24 text-6xl">
        <div className="text-white pr-3">User</div>
        <div>{showLogin ? 'Login' : 'Signup'}</div>
      </div>
      <div className="w-1/2 h-1/2 flex justify-center items-center">
        {showLogin ? <LoginComponent /> : <RegisterComponent />}
      </div>
      <button className="" onClick={() => setShowLogin(!showLogin)}>
        Switch to {showLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default SignUp;
