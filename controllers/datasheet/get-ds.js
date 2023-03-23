const getDS = require("../../db/datasheet/get-ds");
const exampleSheet = require("../../users-example.json");

const getDataSheet = async (req, res, next) => {

  const clientDSrequired = req.params.datasheet;
  let response;

  try {

    if (clientDSrequired === "example") {
      response = exampleSheet;
    } else {

      response = await getDS(clientDSrequired);
      console.log(response)
      
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
