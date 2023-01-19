const getDS = require("../db/datasheet/get-ds");
const exampleSheet = require("../users-example.json");

const getDataSheet = async (req, res, next) => {
  const clientDSrequired = req.params.datasheet;
  let response;

  try {
    if (clientDSrequired === "example") {
      response = exampleSheet;
    } else {
      const getDSResponse = await getDS(clientDSrequired);

      response = getDSResponse.dataSheet;

      response.users = getDSResponse.dataUsers.reduce((acc, current) => {

        const exist = acc.findIndex((el) => el.name === current.name);

        if (!exist) {

          acc[exist].concepts.push({
            concept: current.concept,
            amount: current.amount,
          });
        
          return acc;
        } else {
          return [
            ...acc,
            {
              name: current.name,
              concepts: current.concept
                ? [{ concept: current.concept, amount: current.amount }]
                : [],
            },
          ];
        }
     
      }, []);
    
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
