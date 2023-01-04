const { getConnection } = require("./get-connection");
const mysql = require("mysql2/promise");
require("dotenv").config();

const main = async () => {
  let connection;

  try {
    const connection = await getConnection();

    await connection.query(
      "DROP TABLE IF EXISTS users,dataSheet,dataSheetUsers,userConcepts"
    );

    await connection.query(`
    CREATE TABLE users (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dateCreation DATETIME NOT NULL,
        dateLastLogIn DATETIME,
        name VARCHAR(20) DEFAULT "Undefined",
        surname VARCHAR(20) DEFAULT "Undefined",
        email VARCHAR(100) UNIQUE NOT NULL,
        password TINYTEXT NOT NULL,
        userName VARCHAR(25)  ,
        image TINYTEXT,
        registrationCode TINYTEXT,       
        active BOOLEAN DEFAULT false        
    )`);

    await connection.query(`
    CREATE TABLE dataSheet (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dateCreation DATETIME NOT NULL,
        dateLastChange DATETIME,
        title VARCHAR(50) NOT NULL,
        creator VARCHAR(20) ,
        description VARCHAR(150) ,
        badge VARCHAR(20) ,
        urlCode VARCHAR(50) NOT NULL,
        active BOOLEAN DEFAULT true        
    )`);

    await connection.query(`
    CREATE TABLE dataSheetUsers (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dataSheetId INTEGER NOT NULL,
        name VARCHAR(20) NOT NULL
    )`);

    await connection.query(`
    CREATE TABLE userConcepts (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dataSheetUserId INTEGER NOT NULL,
        concept VARCHAR(20) NOT NULL,
        amount INTEGER NOT NULL
      
    )`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("All done, releasing connection");
    if (connection) connection.release();
    process.exit();
  }
};

main();
