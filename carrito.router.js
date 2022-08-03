const express = require("express");
const { Router } = express;
const routerCarrito = Router();
const carrito = require("./carrito/carrito.json");
const productos = require("./products/products.json");
const fs = require("fs");

routerCarrito.post("/", (req, res) => {
  const id = carrito.length + 1;
  const newCarrito = {
    id: id,
    timestamp: new Date().toLocaleTimeString(),
    productos: { id: id },
  };
  carrito.push(newCarrito);
  fs.writeFileSync("carrito/carrito.json", JSON.stringify(carrito), "utf-8");
  res.send(carrito);
});

routerCarrito.delete("/:id", (req, res) => {
  const { id } = req.params;
  carrito.forEach((e, i) => {
    if (e.idCarrito == id) {
      carrito.splice(i, 1);
    }
  });
  fs.writeFileSync("carrito/carrito.json", JSON.stringify(carrito), "utf-8");
  res.send(carrito);
});

routerCarrito.get("/products", (req, res) => {
  res.send(carrito);
});

routerCarrito.post("/:id/products", (req, res) => {
  const total = productos.length;
  const { id } = req.params;
  if (id <= total) {
    function productById(id) {
      const data = productos;
      const respuesta = data.find((res) => res.id == id);
      return respuesta;
    }
    const pepe = productById(id);
    carrito.push(pepe);
    fs.writeFileSync("carrito/carrito.json", JSON.stringify(carrito), "utf-8");
    res.send(carrito);
  } else {
    res.send("Ese producto no existe");
  }
});

routerCarrito.delete("/:id/products/:id_prod", (req, res) => {
  const { id_prod } = req.params;
  carrito.forEach((e, i) => {
    if (e.idCarrito == id_prod) {
      carrito.splice(i, 1);
    }
  });
  fs.writeFileSync("carrito/carrito.json", JSON.stringify(carrito), "utf-8");
  res.send(carrito);
});

module.exports = routerCarrito;
