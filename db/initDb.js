const { getConnection } = require("./get-connection");

const main = async () => {
  let connection;

  try {
    connection = await getConnection();

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
  } catch (error) {
    console.error(error);
  } finally {
    console.log("All done, releasing connection");
    if (connection) connection.release();
    process.exit();
  }
};

main();