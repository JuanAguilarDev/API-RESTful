const colors = require('colors');
const express = require('express')

const config = require("./config");
const app = express();
const productosRouter = require("./src/routes/productosRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/productos", productosRouter);


const servidor = app.listen(config.PORT, () => {
  console.log(`Escuchando en el puerto: ${config.PORT}`.green);
});

module.exports = servidor;
