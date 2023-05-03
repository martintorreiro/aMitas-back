const addUserDb = require("../../db/datasheet/add-user");
const checkUserDs = require("../../db/datasheet/check-user-ds");
const getUsers = require("../../db/datasheet/get-users");

const addUser = async (req, res, next) => {
  const { user, dataId } = req.body;
  
  try {
    await checkUserDs(user, dataId);
    await addUserDb(user, dataId);
    const updatedUsers = await getUsers(dataId)
    res.send({
      status: "ok",
      data:updatedUsers,
      message: "Usuario añadido a la lista",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
