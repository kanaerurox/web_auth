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

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
      // MainDB
      MAIN_DB_HOST: "",
      MAIN_DB_PORT: 1433,
      MAIN_DB_USERNAME: "",
      MAIN_DB_PASSWORD: "",
      MAIN_DB_DATABASE: "LosaGame",
  
      // SecondDB
      SECOND_DB_HOST: "",
      SECOND_DB_PORT: 1433,
      SECOND_DB_USERNAME: "",
      SECOND_DB_PASSWORD: "",
      SECOND_DB_DATABASE: "LosaGame_Log",
  
      // ThirdDB
      THIRD_DB_HOST: "",
      THIRD_DB_PORT: 1433,
      THIRD_DB_USERNAME: "",
      THIRD_DB_PASSWORD: "",
      THIRD_DB_DATABASE: "LosaLogData",
      USE_BCRYPT: true,
    },
  };
  
  module.exports = nextConfig;