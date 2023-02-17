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

    console.log(dataSheet);

    return dataSheet[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getDS;
