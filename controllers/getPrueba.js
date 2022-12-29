const exampleSheet = require("../users-example.json");

const getPrueba = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: exampleSheet,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getPrueba;
