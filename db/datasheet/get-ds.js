const { getConnection } = require("../get-connection");

const getDS = async (urlCode) => {
  let connection;
  try {
    connection = await getConnection();

    const [dataSheet] = await connection.query(
      `
        SELECT ds.*, SUM(uc.amount) AS totalAmount FROM datasheet ds
        LEFT JOIN datasheetusers dsu ON ds.id = dsu.dataSheetId
        LEFT JOIN userconcepts uc ON dsu.id = uc.dataSheetUserId
        WHERE ds.urlCode = ? GROUP BY ds.id;
        `,
      [urlCode]
    );
    
    return dataSheet[0];

  } finally {
    if (connection) connection.release();
  }
};

module.exports = getDS;
