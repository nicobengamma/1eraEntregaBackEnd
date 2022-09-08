const express = require("express");
const routerCarrito = require("./routes/carrito.router");
const routerProducts = require("./routes/products.router");
const routerUser = require("./routes/user.router");

const PORT = 8080;

const app = express();

//middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

//routes //

app.use("/api/carrito", routerCarrito);
app.use("/api/products", routerProducts);
app.use("/api/user", routerUser);

app.listen(PORT, () => {
  console.log("trabajan2...");
});
