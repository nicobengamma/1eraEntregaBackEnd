const express = require("express");
const routerProducts = require("./products.router");
const routerCarrito = require("./carrito.router");
const routerAdmin = require("./admin.router");

const fs = require("fs");

const PORT = 8080;

const productos = require("./products/products.json");
const carrito = require("./carrito/carrito.json");

const app = express();

//middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

//routes //

app.use("/api/products", routerProducts);
app.use("/api/carrito", routerCarrito);
app.use("/api/admin", routerAdmin);

app.listen(PORT, () => {
  console.log("trabajan2...");
});
