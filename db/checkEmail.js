const { generateError } = require("../helpers");
const { getConnection } = require("./get-connection");

const checkEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    const [existEmail] = await connection.query(
      `
        SELECT email, active
        FROM users
        WHERE email = ? ;
        `,
      [email]
    );
    console.log(existEmail);
    if (!existEmail.length < 1) {
      if (!existEmail[0].active) {
        throw generateError("El usuario esta pendiente de verificacion", 409);
      }

      throw generateError(
        "Ya existe un usuario en la base de datos con ese email",
        409
      );
    }

    return true;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = checkEmail;
