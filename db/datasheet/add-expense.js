const { getConnection } = require("../get-connection");

const addExpenseDb = async (userId, concept, amount) => {
  let connection;

  try {
    connection = await getConnection();

    const [newUser] = await connection.query(
      `
              INSERT INTO userconcepts(dataSheetUserId,concept,amount)
              VALUES(?,?,?) 
          `,
      [userId, concept, amount]
    );

    return true;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addExpenseDb;
