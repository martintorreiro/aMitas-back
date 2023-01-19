const { getConnection } = require("../get-connection");

const getDS = async (urlCode) => {
  let connection;
  try {
    connection = await getConnection();

    const [dataSheet] = await connection.query(
      `
        SELECT id,dateCreation,title,description,creator,badge,urlCode
        FROM datasheet
        WHERE urlCode = ? ;
        `,
      [urlCode]
    );

    const [dataUsers] = await connection.query(
      `
      SELECT dsu.name,uc.concept,uc.amount
      FROM datasheetusers dsu
      LEFT JOIN userconcepts uc
      ON dsu.id = uc.dataSheetUserId
      WHERE dsu.dataSheetId = ?;
        `,
      [dataSheet[0].id]
    );
    console.log("dataUSers", dataUsers);
    return { dataSheet: dataSheet[0], dataUsers };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getDS;
