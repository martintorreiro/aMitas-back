require("dotenv").config();

const { createConnection } = require("mysql2");
const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

/* const getConnection = async () => {
  return await mysql.createConnection(process.env.DATABASE_URL);
}; */

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool(
      {
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      }
      /*  process.env.DATABASE_URL */
    );
  }

  return await pool.getConnection();
};

module.exports = {
  getConnection,
};
