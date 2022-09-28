const express = require("express");
const routerCarrito = require("./routes/carrito.router");
const routerProducts = require("./routes/products.router");
const routerUser = require("./routes/user.router");
const routerInfo = require("./routes/info.router");
const routerRandoms = require("./routes/randoms.router");
const config = require("./config");
require("dotenv").config();

const HOST = process.env.HOST;

const app = express();

// Middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

// Routes //

app.use("/api/carrito", routerCarrito);
app.use("/api/products", routerProducts);
app.use("/api/user", routerUser);
app.use("/info", routerInfo);
app.use("/api/randoms", routerRandoms);

// PORT //

app.listen(config.PORT, HOST, () => {
  console.log(`app listen on http://${HOST}:${config.PORT}`);
});
