const { getConnection } = require("../get-connection");

const getExpenses = async (datasheetId) => {
  let connection;
  try {
    connection = await getConnection();

    const [dataExpenses] = await connection.query(
      `
      SELECT uc.*, dsu.name FROM userconcepts uc
      LEFT JOIN datasheetusers dsu ON dsu.id = uc.dataSheetUserId
      WHERE dsu.dataSheetId = ?;
      `,
      [datasheetId]
    );
    
    return dataExpenses;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getExpenses;
