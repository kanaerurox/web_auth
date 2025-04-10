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

import { NextResponse } from "next/server";
import sql from "mssql";
import { LosaGameCfg } from "@/Utils/DB_Connection";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Username and password are required!" }, { status: 400 });
  }
  try {
    await sql.connect(LosaGameCfg);

    const userQuery = await sql.query`SELECT * FROM userMemberDB WHERE userID = ${username} AND verified = 1`;
    const user = userQuery.recordset[0];

    if (!user) {
      return NextResponse.json({ message: "Account not found or not verified!" }, { status: 404 });
    }

    if (password !== user.userPWD) {
      return NextResponse.json({ message: "Incorrect password!" }, { status: 401 });
    }

    const userGameData = await sql.query`SELECT gameMoney, playTime, userLevel FROM userGameDB WHERE accountIDX = ${user.accountIDX}`;
    const userCashData = await sql.query`SELECT amtCash AS realCash, amtBonus AS bonusCash FROM userCashDB WHERE accountIDX = ${user.accountIDX}`;

    const gameMoney = userGameData.recordset[0]?.gameMoney || 0;
    const playTime = userGameData.recordset[0]?.playTime || 0;
    const connDate = userGameData.recordset[0]?.connDate || 0;
    const userLevel = userGameData.recordset[0]?.userLevel || 0;

    const realCash = userCashData.recordset[0]?.realCash || 0;
    const bonusCash = userCashData.recordset[0]?.bonusCash || 0;

    return NextResponse.json({
      userID: user.userID,
      nickName: user.nickName,
      email: user.Email,
      isVIP: user.is_vip_state,
      gameMoney,
      playTime,
      connDate,
      userLevel,
      realCash,
      bonusCash,
      regDate: user.regDate,
      message: "Login successful",
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    await sql.close();
  }
}
