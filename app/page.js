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

import Link from 'next/link';

export default function Home() {
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

      <div className="bg-white border-2 border-black p-8 rounded-lg shadow-lg w-96 z-10">
        <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">Losa Auth</h1>
        <p className="text-center text-lg text-gray-700 mb-6">Please choose an option to continue</p>
        
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="./auth/Login"
            className="w-full py-4 text-white font-bold text-center rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Link>

          <Link
            href="/auth/Register"
            className="w-full py-4 text-white font-bold text-center rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
