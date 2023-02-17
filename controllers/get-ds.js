const getDS = require("../db/datasheet/get-ds");
const getUsersConcepts = require("../db/datasheet/get-users-concepts");
const exampleSheet = require("../users-example.json");

const getDataSheet = async (req, res, next) => {
  const dsRequired = req.params.datasheet;
  let response;

  try {
    if (dsRequired === "example") {
      response = exampleSheet;
    } else {
      const responseDs = await getDS(dsRequired);

      response = responseDs;

      console.log(response);

      const responseUsersConcepts = getUsersConcepts(responseDs.id);

      response.users = responseUsersConcepts.reduce((acc, current) => {
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
