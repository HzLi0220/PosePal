import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, username }),
        }
      );
      const data = await response.json();
      console.log(data);
      alert('You have successfully registered. Please login to continue.');
      // Handle response or redirect user
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white h-full w-full rounded-2xl bg-white/50 flex flex-col justify-evenly items-center"
    >
      <div className="flex text-2xl items-center">
        <p className="text-gray-700 pr-3 pr-10 my-auto">Username: </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-72 mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex text-2xl items-center">
        <p className="text-gray-700 pr-3 pr-20 my-auto">Email: </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-72 mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex text-2xl items-center">
        <p className="text-gray-700 pr-3 pr-10 my-auto">Password: </p>
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
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
