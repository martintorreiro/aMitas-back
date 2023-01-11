const checkEmail = require("../../db/users/check-email");
const registerUser = require("../../db/users/register-user");
const sendEmail = require("../../db/users/send-email");
const { randomString } = require("../../helpers");

const newUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await checkEmail(email);

    const registrationCode = randomString(6);

    await registerUser(email, password, registrationCode);

    /*  const emailInfo = await sendEmail(email, registrationCode); */

    res.send({
      status: "ok",
      message:
        "Usuario registrado, se le ha enviado un email a su correo con una clave de confirmacion ",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = newUser;
