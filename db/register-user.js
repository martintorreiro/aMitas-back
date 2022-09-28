const { getConnection } = require("./get-connection");

const registerUser = async (email, password, registrationCode) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
              INSERT INTO users(dateCreation, email, password, registrationCode )
              VALUES(UTC_TIMESTAMP, ?, SHA2(?, 512), ?)
          `,
      [email, password, registrationCode]
    );

    return true;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = registerUser;
