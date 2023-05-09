const { generateError } = require("../../helpers");
const { getConnection } = require("../get-connection");

const checkPass = async (email, password) => {
  let connection;
  try {
    
    connection = await getConnection();
    console.log("check")   
    const [result] = await connection.query(
      `
          SELECT *
          FROM users
          WHERE email=? AND password=SHA2(?, 512)
        `,
      [email, password]
    );

    if (result.length < 1) {
      throw generateError(
        "El usuario no existe o la contraseña es incorrecta",
        409
      );
    }

    return result.id;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = checkPass;
