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

import sql from 'mssql';
import { LosaGameCfg } from "../../../Utils/DB_Connection";

let responseDB = {
    status: 200,
    Message: "Error",
};

const bannedWords = [
    "kontol", "memek", "dick", "pussy", "developer", "academia", "mod",
    "태스터", "dev", "태스터", "gm", "운영자", "운영", "관리자", "매니저",
    "메니저", "운영진", "개발", "master", "helper", "developer", "[io]",
    "[gn]", "[we]", "lostnight", "gamemaster", "wemade", "개발자", "마스터",
    "테스터", "도우미", "machos", "hack", "test", "origin", "exotic", "utophia",
    "mutant", "lostsaga"
];

const checkString = (string, banned_words) => {
    string = string.trim().toLowerCase();
    for (let banned_word of banned_words) {
        if (string.includes(banned_word.toLowerCase())) {
            responseDB.Message = `Username contains prohibited words!`;
            responseDB.status = 403;
            return false;
        }
    }
    return true;
};

const checkstringlang = (string) => {
    if (isChinese(string) || isJapanese(string) || isKorean(string)) {
        responseDB.Message = `Username is prohibited to use Unicode text!`;
        responseDB.status = 403;
        return true;
    }
    return false;
};

const isChinese = (string) => {
    return /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF]/u.test(string);
};

const isJapanese = (string) => {
    return /[\u4E00-\u9FBF\u3040-\u309F\u30A0-\u30FF]/u.test(string);
};

const isKorean = (string) => {
    return /[\u3130-\u318F\uAC00-\uD7AF]/u.test(string);
};

// Check the length of the username, password, and email
const checkLenghtField = async (username, password, email) => {
    if (username.length < 4 || password.length < 4 || email.length < 4) {
        responseDB.Message = "The field must be at least 4 characters.";
        return false;
    }
    if (username.length > 20 || password.length > 20) {
        responseDB.Message = "The username and password cannot exceed 20 characters in length.";
        responseDB.status = 403;
        return false;
    }
    return true;
};

const checkAlphaNum = async (username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(username)) {
        responseDB.Message = `The username field may only contain alphanumeric characters.`;
        responseDB.status = 403;
        return false;
    }
    return true;
};

const userdefaultValue = {
    userID: "",
    nickName: "",
    userPWD: "",
    email: "",
    mailling: 0,
    userType: 100,
    joinType: 10,
    eventType: 0,
    cpType: 0,
    limitType: 0,
    limitDate: "1999-01-01 00:00:00.000",
    regDate: "",
    userImg: "",
    verified: 0,
    userRole: null,
    userEncode: "111111111111111",
    amtCash: 100000, // Real Cash
    amtBonus: 100000, // Bonus Cash
    amtLimit: 1000000,
    amtSum: 0,
    gameMoney: 90000000, // Peso
};

export async function POST(request) {
    const { username, password, email } = await request.json();

    const isGoodLength = await checkLenghtField(username, password, email);
    let isAlphaNum = await checkAlphaNum(username);
    let isValidUsername = checkString(username.toLowerCase(), bannedWords);
    let isCjk = checkstringlang(username.toLowerCase());

    if (!isGoodLength || !isAlphaNum || !isValidUsername || isCjk) {
        return new Response(JSON.stringify(responseDB), { status: responseDB.status });
    }

    try {
        const now = new Date();
        const regDate = now.toISOString().substring(0, 23).replace("T", " ");
        const updatedDate = now.setDate(now.getDate() + 28);
        const presentDate = new Date(updatedDate)
            .toISOString()
            .substring(0, 23)
            .replace("T", " ");

        userdefaultValue.userID = username.toLowerCase();
        userdefaultValue.nickName = username;
        userdefaultValue.userPWD = password;
        userdefaultValue.email = email;
        userdefaultValue.regDate = regDate;

        // Connect to database
        const pool = await sql.connect(LosaGameCfg);

        const checkExistUsername = await pool.request()
            .input("userID", sql.NVarChar, username)
            .query("SELECT * FROM userMemberDB WHERE userID = @userID");

        if (checkExistUsername.recordset.length > 0) {
            responseDB.Message = "Username already registered";
            responseDB.status = 403;
            return new Response(JSON.stringify(responseDB), { status: responseDB.status });
        }

        const lastID = await pool.request().query("SELECT IDENT_CURRENT('userMemberDB') as last_id");

        const requestBatch = pool.request();
        requestBatch.input("accountIDX", sql.Int, lastID.recordset[0].last_id + 1);
        requestBatch.input("userID", sql.NVarChar, userdefaultValue.userID);
        requestBatch.input("nickName", sql.NVarChar, userdefaultValue.nickName);
        requestBatch.input("userPWD", sql.NVarChar, userdefaultValue.userPWD);
        requestBatch.input("email", sql.NVarChar, userdefaultValue.email);
        requestBatch.input("mailling", sql.Int, userdefaultValue.mailling);
        requestBatch.input("userType", sql.Int, userdefaultValue.userType);
        requestBatch.input("joinType", sql.Int, userdefaultValue.joinType);
        requestBatch.input("eventType", sql.Int, userdefaultValue.eventType);
        requestBatch.input("cpType", sql.Int, userdefaultValue.cpType);
        requestBatch.input("limitType", sql.Int, userdefaultValue.limitType);
        requestBatch.input("limitDate", sql.DateTime, userdefaultValue.limitDate);
        requestBatch.input("userImg", sql.NVarChar, userdefaultValue.userImg);
        requestBatch.input("verified", sql.Int, userdefaultValue.verified);
        requestBatch.input("userRole", sql.Int, userdefaultValue.userRole);
        requestBatch.input("amtCash", sql.Int, userdefaultValue.amtCash);
        requestBatch.input("amtBonus", sql.Int, userdefaultValue.amtBonus);
        requestBatch.input("amtLimit", sql.Int, userdefaultValue.amtLimit);
        requestBatch.input("amtSum", sql.Int, 0);
        requestBatch.input("chgDate", sql.Int, 0);
        requestBatch.input("userState", sql.Int, 0);
        requestBatch.input("gameMoney", sql.Int, userdefaultValue.gameMoney);
        requestBatch.input("playTime", sql.Int, 0);
        requestBatch.input("conn_count", sql.Int, 0);
        requestBatch.input("userLevel", sql.Int, 0);
        requestBatch.input("userEXP", sql.Int, 0);
        requestBatch.input("rencpoint", sql.Int, 0);
        requestBatch.input("renspoint", sql.Int, 0);
        requestBatch.input("relateLevel", sql.Int, 0);
        requestBatch.input("regionType", sql.Int, 0);
        requestBatch.input("refillData", sql.Int, 0);
        requestBatch.input("connDate", sql.DateTime, "2000-01-01");
        requestBatch.input("type1_win", sql.Int, 0);
        requestBatch.input("type1_lose", sql.Int, 0);
        requestBatch.input("type1_kill", sql.Int, 0);
        requestBatch.input("type1_death", sql.Int, 0);
        requestBatch.input("type2_win", sql.Int, 0);
        requestBatch.input("type2_lose", sql.Int, 0);
        requestBatch.input("type2_kill", sql.Int, 0);
        requestBatch.input("type2_death", sql.Int, 0);
        requestBatch.input("type3_win", sql.Int, 0);
        requestBatch.input("type3_lose", sql.Int, 0);
        requestBatch.input("type3_kill", sql.Int, 0);
        requestBatch.input("type3_death", sql.Int, 0);
        requestBatch.input("type4_win", sql.Int, 0);
        requestBatch.input("type4_lose", sql.Int, 0);
        requestBatch.input("type4_kill", sql.Int, 0);
        requestBatch.input("type4_death", sql.Int, 0);
        requestBatch.input("encodeKey", sql.NVarChar, userdefaultValue.userEncode);
        requestBatch.input("gameServerID", sql.Int, 0);
        requestBatch.input("userName", sql.NVarChar, "");
        requestBatch.input("userBirthday", sql.NVarChar, "010101");
        requestBatch.input("userJumin1", sql.NVarChar, "");
        requestBatch.input("userJumin2", sql.NVarChar, "");
        requestBatch.input("userEncode", sql.NVarChar, userdefaultValue.userEncode);
        requestBatch.input("userNumber", sql.NVarChar, "1");
        requestBatch.input("userGender", sql.Int, 0);
        requestBatch.input("returnValue", sql.Int, 1);
        requestBatch.input("userIP", sql.NVarChar, "0.0.0.0");
        requestBatch.input("presentDate", sql.DateTime, presentDate);
        requestBatch.input("regDate", sql.DateTime, regDate);

        const timestamp = Math.floor(Date.now() / 1000);
        requestBatch.input("date_expired", sql.Int, timestamp);
        requestBatch.input("updatedDate", sql.Int, timestamp);

        await requestBatch.batch(`
            INSERT INTO userMemberDB (userID, nickName, userPWD, email, mailling, userType, joinType, eventType, cpType, limitType, limitDate, regDate, userImg, verified, userRole)
            VALUES (@userID, @nickName, @userPWD, @email, @mailling, @userType, @joinType, @eventType, @cpType, @limitType, @limitDate, @regDate, @userImg, @verified, @userRole);
        
            INSERT INTO userCashDB (accountIDX, amtCash, amtBonus, amtLimit, amtSum, chgDate, regDate)
            VALUES (@accountIDX, @amtCash, @amtBonus, @amtLimit, @amtSum, @chgDate, @regDate);
        
            INSERT INTO userGameDB (accountIDX, userState, gameMoney, playTime, conn_count, userLevel, userEXP, rencpoint, renspoint, relateLevel, regionType, refillData, connDate, regDate)
            VALUES (@accountIDX, @userState, @gameMoney, @playTime, @conn_count, @userLevel, @userEXP, @rencpoint, @renspoint, @relateLevel, @regionType, @refillData, @connDate, @regDate);
        
            INSERT INTO userRecordBattleDB (accountIDX, type1_win, type1_lose, type1_kill, type1_death, type2_win, type2_lose, type2_kill, type2_death, type3_win, type3_lose, type3_kill, type3_death, type4_win, type4_lose, type4_kill, type4_death, regDate)
            VALUES (@accountIDX, @type1_win, @type1_lose, @type1_kill, @type1_death, @type2_win, @type2_lose, @type2_kill, @type2_death, @type3_win, @type3_lose, @type3_kill, @type3_death, @type4_win, @type4_lose, @type4_kill, @type4_death, @regDate);
        
            INSERT INTO userLoginDB (accountIDX, encodeKey, gameServerID, connDate)
            VALUES (@accountIDX, @encodeKey, @gameServerID, @connDate);
        
            INSERT INTO userNameDB (accountIDX, userName, userBirthday, userJumin1, userJumin2, userEncode, userNumber, userGender, returnValue, userIP, regDate)
            VALUES (@accountIDX, @userName, @userBirthday, @userJumin1, @userJumin2, @userEncode, @userNumber, @userGender, @returnValue, @userIP, @regDate);
        
            INSERT INTO dbo.userPresentDB (sendIDX, receiveIDX, presentType, value1, value2, value3, value4, msgType, flag, limitDate, regDate)
            VALUES (1, @accountIDX, 1, 34, 0, 0, 0, 3, 1, @presentDate, @regDate);  -- Ensure regDate is set here
        `);

        responseDB.Message = "Successfully registered account!";
        responseDB.status = 200;
        return new Response(JSON.stringify(responseDB), { status: 200 });

    } catch (error) {
        responseDB.Message = error.message;
        responseDB.status = 500;
        return new Response(JSON.stringify(responseDB), { status: 500 });
    }
}