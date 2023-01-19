const express = require("express");
const newUser = require("./controllers/users/new-user");
const cors = require("cors");
const { logging } = require("googleapis/build/src/apis/logging");
const login = require("./controllers/users/login");
const validate = require("./controllers/users/validate");
const newDataSheet = require("./controllers/new-data-sheet");
const getDataSheet = require("./controllers/get-ds");
const addUser = require("./controllers/add-user");
const addExpense = require("./controllers/add-expense");

const app = express();

app.use(express.json());
app.use(cors());
//Settings

app.set("port", 3100);

app.get("/getDS/:datasheet", getDataSheet);

app.post("/register", newUser);
app.post("/login", login);
app.post("/validate", validate);
app.post("/newDataSheet", newDataSheet);

app.post("/addUser", addUser);
app.post("/addExpense", addExpense);

//Middleware 404

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not Found / No encontrado",
  });
});

//Middleware gestor de errores

app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(app.get("port"), () => {
  console.log(`Aplicacion corriendo en el puerto ${app.get("port")}`);
});
