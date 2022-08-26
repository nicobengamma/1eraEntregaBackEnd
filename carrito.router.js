const express = require("express");
const { Router } = express;
const routerCarrito = Router();
const mongoose = require("mongoose");
const client = require("./server");
const uri =
  "mongodb+srv://admin:admin@cluster0.uo708jn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

client.connect((err) => {
  const collection = client.db("myFirstDatabase").collection("users");
  const collectionCarrito = client.db("myFirstDatabase").collection("carts");
  routerCarrito.post("/addCarrito", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const productos = data;
      const total = productos.length;
      const { id } = req.body;
      if (id <= total) {
        mongoose.connect(uri, {}, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
        const Users = mongoose.model("users", {
          id: Number,
          name: String,
          descripcion: String,
          codigo: Number,
          price: Number,
          stock: Number,
          url: String,
        });
        Users.find({ id: id }, function (err, docs) {
          if (err) {
            console.log(err);
          }
          console.log(docs[0].name);
          const Carrito = mongoose.model("cart", {
            id: Number,
            name: String,
            descripcion: String,
            codigo: Number,
            price: Number,
            stock: Number,
            url: String,
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
          addCart.save().then(() => {
            console.log("Se agrego al carrito");
          });
          setTimeout(() => {
            collectionCarrito.find({}).toArray((err, data) => {
              const productos = data;
              res.render("carrito.ejs", { productos });
            });
          }, 1000);
        });
      }
    });
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
      fs.writeFileSync(
        "carrito/carrito.json",
        JSON.stringify(carrito),
        "utf-8"
      );
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
});

module.exports = routerCarrito;
