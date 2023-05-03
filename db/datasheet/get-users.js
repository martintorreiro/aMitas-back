const { getConnection } = require("../get-connection");

const getUsers = async (datasheetId) => {
  let connection;
  try {
    connection = await getConnection();

    const [dataUsers] = await connection.query(
      `
      SELECT dsu.*,SUM(uc.amount) AS amount  FROM datasheetusers dsu
      LEFT JOIN userconcepts uc ON dsu.id = uc.dataSheetUserId
      WHERE dsu.dataSheetId = ?
      GROUP BY dsu.id;
        `,
      [datasheetId]
    );
  
    return dataUsers;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUsers;