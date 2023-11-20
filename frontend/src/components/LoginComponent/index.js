import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify({ email, password }));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (data && data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('log in successful');
      }
      navigate('/newsession');
    } catch (error) {
      console.error(error);
      alert('log in unsuccessful');
      // Handle error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white h-full w-full rounded-2xl bg-white/50 flex flex-col justify-evenly items-center"
    >
      <div className="flex text-2xl items-center">
        <p className="text-gray-700 pr-10 my-auto">Email:</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-72 mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex text-2xl items-center">
        <div className="text-gray-700 pr-3 my-auto">Password:</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-44 border bg-yellow-300 px-5 py-2 rounded-lg"
        >
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default Login;
