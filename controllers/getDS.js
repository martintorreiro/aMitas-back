const getDS = require("../db/getDS");
const exampleSheet = require("../users-example.json");

const getDataSheet = async (req, res, next) => {
  const clientDSrequired = req.params.datasheet;
  let response;
  console.log(clientDSrequired);
  try {
    if (clientDSrequired === "example") {
      response = exampleSheet;
    } else {
      const jjj = await getDS(clientDSrequired);
      console.log(jjj);
    }

    res.send({
      status: "ok",
      message: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getDataSheet;
