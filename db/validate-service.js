const { generateError } = require("../helpers");
const { getConnection } = require("./get-connection");

const getCode = async (email,registrationCode) => {
  let connection;
  try {
    connection = await getConnection();

    const [codeResponse] = await connection.query(
      `
              SELECT registrationCode
              FROM users
              WHERE email = ?
          `,
      [email]
    );

    if(codeResponse.length<1){
      throw generateError("ningun usuario con ese email",409);
    }

    if(codeResponse[0].registrationCode!==registrationCode){
        
      throw generateError("El codigo introducido no es correcto",409)
  }

console.log(email,registrationCode)
    await connection.query(
    `
    UPDATE users SET active = 1
     WHERE email=?
           
        `,
    [email]
  );

  

    return true;
  } finally {
    if (connection) connection.release();
  }
};


module.exports = {getCode};