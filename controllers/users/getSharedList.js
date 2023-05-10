const getSharedListDb = require("../../db/users/getSharedList");

const getSharedList = async (req, res, next) => {
  console.log("hola",req.params.userId)
  const userId = req.params.userId;
  let response;
  
  try {
   
    response = await getSharedListDb(userId);
    
    console.log("sharedList",response);

    res.send({
      status: "ok",
      message: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getSharedList;