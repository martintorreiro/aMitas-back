const addUserDb = require("../db/datasheet/add-user");
const checkUserDs = require("../db/datasheet/check-user-ds");

const addUser = async (req, res, next) => {
  const { user, dataId } = req.body;
  try {
    const existUser = await checkUserDs(user, dataId);

    await addUserDb(user, dataId);

    res.send({
      status: "ok",
      message: "Usuario añadido a la lista",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
