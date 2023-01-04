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
      const getDSResponse = await getDS(clientDSrequired);

      const rresponse = getDSResponse.dataSheet;

      rresponse.usuarios = getDSResponse.dataUsers.reduce((acc, current) => {
        const exist = acc.find((el) => el.nombre === current.name);
        console.log(current);

        /* return exist
          ? [...acc]
          : [
              ...acc,
              {
                nombre: current.name,
                conceptos: [
                  { concepto: current.concept, importe: current.amount },
                ],
              },
            ]; */
      }, []);
      console.log("->", rresponse.usuarios);
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
