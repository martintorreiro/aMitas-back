const newDataSheet = async (req, res, next) => {
  try {
    const { dataSheet } = req.body;
    console.log(dataSheet);

    res.send({
      status: "ok",
      message: "Hoja de calculo creada en la base de datos.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = newDataSheet;
