const addUserDb = require("../db/addUser");
const checkUserDs = require("../db/checkUserDs");

const addUser = async (req, res, next) => {
  const { user, dataId } = req.body;
  try {
    const existUser = await checkUserDs(user, dataId);

    await addUserDb(user, dataId);
    res.send({
      status: "ok",
      message:
        "Usuario registrado, se le ha enviado un email a su correo con una clave de confirmacion ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
