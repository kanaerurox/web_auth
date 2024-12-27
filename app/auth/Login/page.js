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
// Copyright © 2024 Mysticalx. All rights reserved.

'use client';

import { useState } from 'react';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    const data = {
      username,
      password,
    };

    try {
      const response = await fetch('/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login successful:', result);

        localStorage.setItem('user', JSON.stringify(result));

        router.push('../../Dashboard');
      } else {
        if (result.message === "Account not found or not verified!") {
          setError("Akun belum terverifikasi!");
          setIsModalOpen(true);
        } else {
          setError(result.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-gray-100 relative"
      style={{
        backgroundColor: 'white',
        backgroundImage: 'linear-gradient(90deg, #DFE5F2 1px, transparent 1px), linear-gradient(180deg, #DFE5F2 1px, transparent 1px)',
        backgroundSize: '50px 50px', 
        backgroundPosition: '0 0, 0 0',
      }}
    >
      <div className="absolute inset-0 bg-white grid grid-cols-4 grid-rows-4 gap-4 opacity-20">
      </div>
      
      <div className="bg-white border-2 border-black p-8 rounded-lg shadow-lg w-full max-w-xs sm:w-96 z-10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label htmlFor="userID" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="userID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="userPWD" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="userPWD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Remember Me{" "}
            </label>
          </div>
          
          <Button 
            type="submit"
            className="w-full py-4 text-black font-bold text-center rounded-lg focus:outline-none focus:ring-2"
            id="loginButton"
          >
            Login
          </Button>

          {error && (
            <p className="mt-4 text-red-600 text-center">{error}</p>
          )}
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-800">
          Don&apos;t have an account?{' '}
          <a href="/auth/Register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Error</h3>
            <p className="text-sm text-gray-800">{error}</p>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section with Glassmorphism */}
      <footer className="absolute bottom-6 text-sm left-1/2 transform -translate-x-1/2 py-2 px-6 text-center bg-white bg-opacity-20 backdrop-blur-lg border-2 border-black rounded-lg text-black w-full max-w-xs sm:w-96">
        <p>&copy; 2024 Mysticalx. All rights reserved.</p>
      </footer>
    </div>
  );
}