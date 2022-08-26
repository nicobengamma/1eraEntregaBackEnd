const express = require("express");
const { Router } = express;
const routerAdmin = Router();
const mongoose = require("mongoose");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.uo708jn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("myFirstDatabase").collection("users");
  const collectionCarrito = client.db("myFirstDatabase").collection("cart");
  routerAdmin.get("/", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("page.ejs", { productos });
    });
  });
  routerAdmin.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    collection.find({ id: id }).toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("page.ejs", { productos });
    });
  });
  routerAdmin.post("/addProd", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const productosBefore = data;
      const { name, price, url } = req.body;
      if (name && price && url) {
        const id = productosBefore.length + 1;
        mongoose.connect(uri, {}, (error) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log("db connected");
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
        const nuevoUsuario = new Users({
          id: id,
          name: req.body.name,
          descripcion: req.body.descripcion,
          codigo: req.body.codigo,
          price: req.body.price,
          stock: req.body.stock,
          url: req.body.url,
        });
        nuevoUsuario.save().then(() => console.log("dato guardado"));
        setTimeout(() => {
          collection.find({}).toArray((err, data) => {
            const productos = data;
            res.render("page.ejs", { productos });
          });
        }, 2000);
      } else {
        res.status(500).json({
          Error: "Solo puede ingresar datos validos",
          help: "Debe ingresar 'name', 'price', 'url' ",
        });
      }
    });
  });
  routerAdmin.post("/actualizarProd", (req, res) => {
    const { id, name, price, url, descripcion, codigo, stock } = req.body;
    if (name && price && url && id && descripcion && codigo && stock) {
      mongoose.connect(uri, {}, (error) => {
        if (error) {
          console.log(error);
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
      Users.findOneAndUpdate(
        { id: id },
        {
          name: req.body.name,
          descripcion: req.body.descripcion,
          codigo: req.body.codigo,
          price: req.body.price,
          stock: req.body.stock,
          url: req.body.url,
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          }
        }
      );
      setTimeout(() => {
        collection.find({}).toArray((err, data) => {
          const productos = data;
          res.render("page.ejs", { productos });
        });
      }, 2000);
    }
  });
  routerAdmin.post("/eliminarProd", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const productos = data;
      const total = productos.length;
      const { id } = req.body;
      if (id <= total) {
        mongoose.connect(uri, {}, (error) => {
          if (error) {
            console.log(error);
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
        Users.findOneAndRemove({ id: id }, function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Removed User : ", docs);
          }
        });
        setTimeout(() => {
          collection.find({}).toArray((err, data) => {
            const productos = data;
            res.render("page.ejs", { productos });
          });
        }, 2000);
      } else {
        res.send("Ese producto no existe");
      }
    });
  });
  routerAdmin.post("/addCarrito", (req, res) => {
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
        });
      }
    });
  });
});

module.exports = routerAdmin;
