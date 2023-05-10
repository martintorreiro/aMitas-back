const { getConnection } = require("../get-connection");

const getSharedListDb = async (userId) => {
  let connection;
  try {
    connection = await getConnection();

    const [sharedList] = await connection.query(
      `
        SELECT * FROM datasheet WHERE creator = ?
        `,
      [userId]
    );
    console.log(sharedList)
    return sharedList;

  } finally {
    if (connection) connection.release();
  }
};

module.exports = getSharedListDb;