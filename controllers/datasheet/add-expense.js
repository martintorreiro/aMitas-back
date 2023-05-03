const addExpenseDb = require("../../db/datasheet/add-expense");

const addExpense = async (req, res, next) => {
  const { dataId, concept, amount } = req.body;
  console.log("--->",dataId,concept,amount)
  try {
    await addExpenseDb(dataId, concept, amount);

    res.send({
      status: "ok",
      message: "Usuario añadido a la lista",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addExpense;
