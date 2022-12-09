const {getCode} =  require("../db/validate-service");
const { generateError } = require("../helpers");


const validate = async (req, res, next) => {
  try {
    const { email , registrationCode} = req.body;
  
     await getCode(email,registrationCode)

    

    
    res.send({
      status: "ok",
      message: "validado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = validate;