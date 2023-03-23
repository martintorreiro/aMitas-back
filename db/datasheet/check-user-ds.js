const { generateError } = require("../../helpers");
const { getConnection } = require("../get-connection");

const checkUserDs = async (user, dataId) => {
  let connection;

  try {
    
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
        "Ya existe un usuario en la hoja de calculo con ese nombre",
        409
      );
    }
    return true;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = checkUserDs;
