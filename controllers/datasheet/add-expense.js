const addExpenseDb = require("../../db/datasheet/add-expense");

const addExpense = async (req, res, next) => {
  const { userId, concept, amount } = req.body;
  console.log("--->",userId,concept,amount)
  try {
    await addExpenseDb(userId, concept, amount);

    res.send({
      status: "ok",
      message: "Gasto añadido",
    });
  } catch (error) {
    error.message = "Error al registrar el gasto"
    next(error);
  }
};

module.exports = addExpense;
