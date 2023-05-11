const { getConnection } = require("../get-connection");

const getSharedListDb = async (userId) => {
  let connection;
  try {
    connection = await getConnection();

    const [sharedList] = await connection.query(
      `
      SELECT ds.*, SUM(uc.amount) AS totalAmount FROM datasheet ds
        LEFT JOIN datasheetusers dsu ON ds.id = dsu.dataSheetId
        LEFT JOIN userconcepts uc ON dsu.id = uc.dataSheetUserId
        WHERE ds.creator = ? GROUP BY ds.id
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