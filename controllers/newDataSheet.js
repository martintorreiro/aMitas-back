const createDataSheet = require("../db/craeteDataSheet");
const { randomString } = require("../helpers");

const newDataSheet = async (req, res, next) => {
  try {
    const { dataSheet } = req.body;

    const urlCode = randomString(30);

    createDataSheet(dataSheet, urlCode);

    res.send({
      status: "ok",
      message: "Hoja de calculo creada en la base de datos.",
      urlCode: urlCode,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = newDataSheet;
