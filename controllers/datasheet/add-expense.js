const addExpenseDb = require("../../db/datasheet/add-expense");

const addExpense = async (req, res, next) => {
  const { userId, concept, amount } = req.body;
  console.log("--->", userId, concept, amount);
  try {
    await addExpenseDb(userId, concept, amount);

    res.send({
      status: "ok",
      message: "Usuario añadido a la lista",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addExpense;
