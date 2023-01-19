const { getConnection } = require("../get-connection");

const addUserDb = async (user, dataId) => {
  let connection;
  try {
    connection = await getConnection();

    const [newUser] = await connection.query(
      `
              INSERT INTO datasheetusers(name,dataSheetId)
              VALUES(?,?) 
          `,
      [user, dataId]
    );

    return true;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addUserDb;
