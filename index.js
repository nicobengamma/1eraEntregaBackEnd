const express = require("express");
const routerCarrito = require("./carrito.router");
const routerProducts = require("./products.router");

const PORT = 8080;

const app = express();

//middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

//routes //

app.use("/api/carrito", routerCarrito);
app.use("/api/products", routerProducts);

app.listen(PORT, () => {
  console.log("trabajan2...");
});
