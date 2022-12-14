const { getConnection } = require("./get-connection");

const createDataSheet = async (data, urlCode) => {
  let connection;
  try {
    connection = await getConnection();

    const [ds] = await connection.query(
      `
              INSERT INTO datasheet(dateCreation, title, description, creator,badge,urlCode )
              VALUES(UTC_TIMESTAMP, ?, ?,?,?,?)
          `,
      [data.titulo, data.descripcion, data.creador, data.moneda, urlCode]
    );

    data.usuarios.map(async (user) => {
      await connection.query(
        `
                    INSERT INTO datasheetusers( dataSheetId,name)
                    VALUES(?,?)
                `,
        [ds.insertId, user.nombre]
      );
    });

    return urlCode;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = createDataSheet;
