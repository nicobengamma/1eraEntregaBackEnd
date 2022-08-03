const express = require("express");
const { Router } = express;
const routerProducts = Router();
const fs = require("fs");

const products = require("../proyectoFinal/products/products.json");

function productById(id) {
  const data = products;
  const respuesta = data.find((res) => res.id == id);
  return respuesta;
}

// Ver los productos en JSON para poder consumir //

routerProducts.get("/", (req, res) => {
  res.json(products);
});

routerProducts.get("/:id", (req, res) => {
  res.send(productById(req.params.id));
});

// Herramientas de Admin Mediante POSTMAN // Sin FrontEnd

routerProducts.use((req, res, next) => {
  if ("admin" in req.headers) {
    next();
  } else {
    res
      .status(500)
      .send(
        "Usted no es administrador, estas opciones estan solamente habilitadas para administradores"
      );
  }
});

routerProducts.post("/", (req, res) => {
  const { name, price, url } = req.body;
  if (name && price && url) {
    const id = products.length + 1;
    const NewProducts = { id, ...req.body };
    products.push(NewProducts);
    fs.writeFileSync(
      "products/products.json",
      JSON.stringify(products),
      "utf-8"
    );
    console.log(products);
    res.send(products);
  } else {
    res.status(500).json({
      Error: "Solo puede ingresar datos validos",
      help: "Debe ingresar 'name', 'price', 'url' ",
    });
  }
});

routerProducts.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, url } = req.body;
  if (name && price && url) {
    products.forEach((e) => {
      if (e.id == id) {
        e.name = name;
        e.price = price;
        e.url = url;
      }
    });
    fs.writeFileSync(
      "products/products.json",
      JSON.stringify(products),
      "utf-8"
    );
    res.send(products);
  } else {
    res.status(500).json({
      Error: "Faltan datos importantes",
    });
  }
});

routerProducts.delete("/:id", (req, res) => {
  const { id } = req.params;
  products.forEach((e, i) => {
    if (e.id == id) {
      products.splice(i, 1);
    }
  });
  fs.writeFileSync("products/products.json", JSON.stringify(products), "utf-8");
  res.send(products);
});

module.exports = routerProducts;
