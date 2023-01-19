const addUserDb = require("./add-user");
const { getConnection } = require("../get-connection");

const createDataSheet = async (data, urlCode) => {

  let connection;

  try {

    connection = await getConnection();

    const [ds] = await connection.query(
          `
              INSERT INTO datasheet(dateCreation, title, description, creator,badge,urlCode )
              VALUES(UTC_TIMESTAMP, ?, ?,?,?,?)
          `,
      [data.title, data.description, data.creator, data.currency, urlCode]
    );

    data.users.map(async (user) => {

      await addUserDb(user.name,ds.insertId)
   
    });

    return urlCode;

  } finally {

    if (connection) connection.release();

  }
};

module.exports = createDataSheet;
