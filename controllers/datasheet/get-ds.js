const getDS = require("../../db/datasheet/get-ds");
const getExpenses = require("../../db/datasheet/get-expenses");
const getUsersConcepts = require("../../db/datasheet/get-expenses");
const getUsers = require("../../db/datasheet/get-users");
const exampleSheet = require("../../users-example.json");

const getDataSheet = async (req, res, next) => {
  console.log("hola")
  const dsRequired = req.params.datasheet;
  let response;
  
  try {
    if (dsRequired === "example") {
      response = exampleSheet;
    } else {
      response = await getDS(dsRequired);
      response.users = await getUsers(response.id);
      response.users.forEach(user => {
        user.balance = user.amount - (response.totalAmount/response.users.length)
      });
      response.expenses = await getExpenses(response.id);

      
    }
    console.log(response);
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
