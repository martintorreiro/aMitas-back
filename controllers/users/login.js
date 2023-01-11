const checkPass = require("../../db/users/check-pass");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await checkPass(email, password);

    const tokenInfo = { email, password };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });
    console.log("login");
    res.send({
      status: "ok",
      message: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
