require("dotenv").config();
const { getConnection } = require("./get-connection");

const main = async () => {
  let connection;

  try {
    const connection = await getConnection();

    await connection.query(
      "DROP TABLE IF EXISTS user, datasheet, dataUser, dataExpense"
    );

    await connection.query(`
    CREATE TABLE user (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dateCreation DATETIME NOT NULL,
        lastLogin DATETIME,
        name VARCHAR(20) DEFAULT "Sin definir",
        surname VARCHAR(20) DEFAULT "Sin definir",
        email VARCHAR(100) UNIQUE NOT NULL,
        password TINYTEXT NOT NULL,
        userName VARCHAR(25) DEFAULT "Sin definir",
        image TINYTEXT,
        registrationCode TINYTEXT,       
        active BOOLEAN DEFAULT false        
    )`);

    await connection.query(`
    CREATE TABLE datasheet (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dateCreation DATETIME NOT NULL,
        dateLastChange DATETIME,
        title VARCHAR(50) NOT NULL,
        creator VARCHAR(20) ,
        description VARCHAR(150) DEFAULT "Sin descripcion" ,
        badge VARCHAR(20) ,
        urlCode VARCHAR(50) NOT NULL,
        active BOOLEAN DEFAULT true ,
        total DECIMAL(12,2) NOT NULL,       
    )`);

    await connection.query(`
    CREATE TABLE dataUser (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dataSheetId INTEGER NOT NULL,
        name VARCHAR(20)  NOT NULL,
    )`);

    await connection.query(`
    CREATE TABLE dataExpense (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dataSheetUserId INTEGER NOT NULL,
        concept VARCHAR(20) REQUIRED,
        amount DECIMAL(10,2) NOT NULL
      
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
