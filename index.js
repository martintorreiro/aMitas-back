const express = require("express");
const newUser = require("./controllers/newUser");
const cors = require("cors");
const { logging } = require("googleapis/build/src/apis/logging");
const login = require("./controllers/login");
const validate = require("./controllers/validate");
const newDataSheet = require("./controllers/newDataSheet");
const getPrueba = require("./controllers/getPrueba");

const app = express();

app.use(express.json());
app.use(cors());
//Settings

app.set("port", 3100);

app.get("/prueba", getPrueba);

app.post("/register", newUser);
app.post("/login", login);
app.post("/validate", validate);
app.post("/newDataSheet", newDataSheet);

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

/* app.get("/", (req, res) => {}); */

app.listen(app.get("port"), () => {
  console.log(`Aplicacion corriendo en el puerto ${app.get("port")}`);
});
