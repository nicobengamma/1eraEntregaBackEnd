const express = require("express");
const { Router } = express;
const routerCarrito = Router();
const carrito = require("./carrito/carrito.json");
const fs = require("fs");

routerCarrito.post("/", (req, res) => {
  const id = carrito.length + 1;
  const newCarrito = { id: id };
  carrito.push(newCarrito);
  fs.writeFileSync("carrito/carrito.json", JSON.stringify(carrito), "utf-8");
  res.send(carrito);
});

routerCarrito.delete("/:id", (req, res) => {
  const { id } = req.params;
  carrito.forEach((e, i) => {
    if (e.id == id) {
      carrito.splice(i, 1);
    }
  });
  fs.writeFileSync("carrito/carrito.json", JSON.stringify(carrito), "utf-8");
  res.send(carrito);
});

routerCarrito.get("/:id/products", (req, res) => {
  res.send(carrito);
});

routerCarrito.post("/:id/products", (req, res) => {});

routerCarrito.delete("/:id/products/:id_prod", (req, res) => {});

module.exports = routerCarrito;
