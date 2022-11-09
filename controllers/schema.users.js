const mongoose = require("mongoose");

const Users = mongoose.model("users", {
  id: Number,
  name: String,
  descripcion: String,
  codigo: Number,
  price: Number,
  stock: Number,
  url: String,
});
const Carrito = mongoose.model("cart", {
  id: Number,
  name: String,
  descripcion: String,
  codigo: Number,
  price: Number,
  stock: Number,
  url: String,
});
const Carts = mongoose.model("carts", {
  id: Number,
  name: String,
  descripcion: String,
  codigo: Number,
  price: Number,
  stock: Number,
  url: String,
});
const nuevoUsuario = new Users({
  id: id,
  name: req.body.name,
  descripcion: req.body.descripcion,
  codigo: req.body.codigo,
  price: req.body.price,
  stock: req.body.stock,
  url: req.body.url,
});
const addCart = new Carrito({
  id: id,
  name: docs[0].name,
  descripcion: docs[0].descripcion,
  codigo: docs[0].codigo,
  price: docs[0].price,
  stock: docs[0].stock,
  url: docs[0].url,
});

module.exports = { Users, Carrito, Carts, nuevoUsuario, addCart };
