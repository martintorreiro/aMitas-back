const { getConnection } = require("./get-connection");

const getDS = async (urlCode) => {
  let connection;
  try {
    connection = await getConnection();

    const [dataSheet] = await connection.query(
      `
        SELECT *
        FROM datasheetusers
        LEFT JOIN datasheet ON datasheetusers.dataSheetId=datasheet.id
        WHERE datasheet.urlCode = ? ;
        `,
      [urlCode]
    );

    console.log(dataSheet);
    return dataSheet;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getDS;
