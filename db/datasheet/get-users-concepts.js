const { getConnection } = require("../get-connection");

const getUsersConcepts = async (datasheetId) => {
  let connection;
  try {
    connection = await getConnection();

    const [dataUsers] = await connection.query(
      `
      SELECT dsu.id,dsu.name,uc.concept,uc.amount
      FROM datasheetusers dsu
      LEFT JOIN userconcepts uc
      ON dsu.id = uc.dataSheetUserId
      WHERE dsu.dataSheetId = ?;
        `,
      [datasheetId]
    );
    console.log("dataUSers->", dataUsers);
    return dataUsers;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUsersConcepts;
