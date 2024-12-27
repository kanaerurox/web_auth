const LosaGameCfg = {
    user: process.env.MAIN_DB_USERNAME || "",
    password: process.env.MAIN_DB_PASSWORD || "",
    database: process.env.MAIN_DB_DATABASE || "",
    server: process.env.MAIN_DB_HOST || "",
    port: parseInt(process.env.MAIN_DB_PORT || "", 10),
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };
  
  const LosaGameLogCfg = {
    user: process.env.SECOND_DB_USERNAME || "",
    password: process.env.SECOND_DB_PASSWORD || "",
    database: process.env.SECOND_DB_DATABASE || "",
    server: process.env.SECOND_DB_HOST || "",
    port: parseInt(process.env.SECOND_DB_PORT || "", 10),
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };
  
  const LosaLogDataCfg = {
    user: process.env.THIRD_DB_USERNAME || "",
    password: process.env.THIRD_DB_PASSWORD || "",
    database: process.env.THIRD_DB_DATABASE || "",
    server: process.env.THIRD_DB_HOST || "",
    port: parseInt(process.env.THIRD_DB_PORT || "", 10),
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };
  
  //latest sql server
  export { LosaGameCfg, LosaGameLogCfg, LosaLogDataCfg };  