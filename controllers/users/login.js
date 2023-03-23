const checkPass = require("../../db/users/check-pass");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res, next) => {
  
  const { email, password } = req.body;

  try {

    await checkPass(email, password);

    const tokenInfo = { email, password };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });
   
    res.send({
      status: "ok",
      message: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
