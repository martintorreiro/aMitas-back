const { generateError } = require("../../helpers");
const { getConnection } = require("../get-connection");

const checkUserDs = async (user, dataId) => {
  let connection;

  try {

    if (user.length < 2) {
      throw generateError(
        "El nombre debe tener 2 letras minimo",
        409
      );
    }
    
    connection = await getConnection();

    const [existUser] = await connection.query(
      `
      SELECT id
      FROM datasheetusers
      WHERE dataSheetId = ? AND name = ?;
        `,
      [dataId, user]
    );
    
    if (!existUser.length < 1) {
      throw generateError(
        "Ya existe un usuario con ese nombre",
        409
      );
    }
    return true;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = checkUserDs;
