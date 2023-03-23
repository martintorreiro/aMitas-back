const { getConnection } = require("../get-connection");

const getDS = async (urlCode) => {
  let connection;
  try {
    connection = await getConnection();

    const [dataSheet] = await connection.query(
      `
        SELECT * FROM datasheet
        WHERE urlCode = ? ;
        `,
      [urlCode]
    );

    console.log(dataSheet);

    const [dataUsers] = await connection.query(
      `
      SELECT dsu.*,SUM(uc.amount) AS amount  FROM datasheetusers dsu
      LEFT JOIN userconcepts uc ON dsu.id = uc.dataSheetUserId
      WHERE dsu.dataSheetId = ?
      GROUP BY dsu.id;
        `,
      [dataSheet[0].id]
    );

    const [dataExpenses] = await connection.query(
      `
      SELECT uc.*, dsu.name FROM userconcepts uc
      LEFT JOIN datasheetusers dsu ON dsu.id = uc.dataSheetUserId
      WHERE dsu.dataSheetId = ?;
      `,
      [dataSheet[0].id]
    );

    const response = dataSheet[0]
    response.totalAmount = dataExpenses.reduce((a, b) => a + b.amount, 0);
    response.users = dataUsers
    response.expenses = dataExpenses
    
    console.log("dataUSers", dataUsers);
    return response;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getDS;
