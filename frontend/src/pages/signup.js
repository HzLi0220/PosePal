import React, { useState } from 'react';
import RegisterComponent from '../components/RegisterComponent';
import LoginComponent from '../components/LoginComponent';

const SignUp = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="container mx-auto p-4">
            {showLogin ? <LoginComponent /> : <RegisterComponent />}
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowLogin(!showLogin)}
            >
                Switch to {showLogin ? 'Register' : 'Login'}
            </button>
        </div>
    );
};

export default SignUp;