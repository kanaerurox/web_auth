// 
//  _____ ______       ___    ___ ________  _________  ___  ________  ________  ___          ___    ___ 
// |\   _ \  _   \    |\  \  /  /|\   ____\|\___   ___\\  \|\   ____\|\   __  \|\  \        |\  \  /  /|
// \ \  \\\__\ \  \   \ \  \/  / | \  \___|\|___ \  \_\ \  \ \  \___|\ \  \|\  \ \  \       \ \  \/  / /
//  \ \  \\|__| \  \   \ \    / / \ \_____  \   \ \  \ \ \  \ \  \    \ \   __  \ \  \       \ \    / / 
//   \ \  \    \ \  \   \/  /  /   \|____|\  \   \ \  \ \ \  \ \  \____\ \  \ \  \ \  \____   /     \/  
//    \ \__\    \ \__\__/  / /       ____\_\  \   \ \__\ \ \__\ \_______\ \__\ \__\ \_______\/  /\   \  
//     \|__|     \|__|\___/ /       |\_________\   \|__|  \|__|\|_______|\|__|\|__|\|_______/__/ /\ __\ 
//                   \|___|/        \|_________|                                            |__|/ \|__| 
//                                                                                                     
// Copyright © 2025 Ruby Saga. All rights reserved.

'use client';

import { useState } from 'react';
import Button from '@/app/components/Button';

export default function Register() {
  const [username, setUsername] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      setError('You must accept the terms and conditions to register');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          nickName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status !== 200) {
        setError(data.Message);
      } else {
        alert('Registration successful!');
        window.location.href = '/auth/Login';
      }
    } catch (error) {
      setError('An error occurred, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-gray-100 relative px-4"
      style={{
        backgroundColor: 'white',
        backgroundImage: 'linear-gradient(90deg, #DFE5F2 1px, transparent 1px), linear-gradient(180deg, #DFE5F2 1px, transparent 1px)',
        backgroundSize: '50px 50px', 
        backgroundPosition: '0 0, 0 0',
      }}
    >
      <div className="absolute inset-0 bg-white grid grid-cols-4 grid-rows-4 gap-4 opacity-20">
      </div>

      <div className="bg-white border-2 border-black p-6 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">REGISTER</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4 sm:flex sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="nickName" className="block text-sm font-medium text-gray-700">Nickname</label>
            <input
              type="text"
              id="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              required
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
              Accept terms and conditions{" "}
              <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          <Button
            type="submit"
            className={`w-full py-4 text-white font-bold text-center rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-800">
          Already have an account?{' '}
          <a href="/auth/Login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>

      <footer className="absolute bottom-6 text-sm left-1/2 transform -translate-x-1/2 py-2 px-6 text-center bg-white bg-opacity-20 backdrop-blur-lg border-2 border-black rounded-lg text-black w-full max-w-md">
        <p>&copy; 2024 Mysticalx. All rights reserved.</p>
      </footer>
    </div>
  );
}
