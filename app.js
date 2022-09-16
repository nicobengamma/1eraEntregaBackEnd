const express = require("express");
const routerCarrito = require("./routes/carrito.router");
const routerProducts = require("./routes/products.router");
const routerUser = require("./routes/user.router");

const PORT = 8080;

const app = express();

// Middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

// Routes //

app.use("/api/carrito", routerCarrito);
app.use("/api/products", routerProducts);
app.use("/api/user", routerUser);

// PORT //

app.listen(PORT, () => {
  console.log("trabajan2...");
});
