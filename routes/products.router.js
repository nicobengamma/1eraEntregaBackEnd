const express = require("express");
const { Router } = express;
const routerProducts = Router();

//-----------------//

const log4js = require("log4js");
const typeLogg = process.env.NODE_ENV == "Production" ? "prod" : "consola";
const logger = log4js.getLogger(typeLogg);

//-----------------//
const mongoose = require("mongoose");
const { client, uri } = require("../controllers/server");
const { Users, nuevoUsuario } = require("../controllers/schema.users");

client.connect((err) => {
  const collection = client.db("myFirstDatabase").collection("users");
  routerProducts.get("/", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("page.ejs", { productos });
    });
  });
  routerProducts.get("/admin", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("admin.ejs", { productos });
    });
  });
  routerProducts.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    collection.find({ id: id }).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("page.ejs", { productos });
    });
  });
  routerProducts.post("/addProd", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productosBefore = data;
      const { name, price, url } = req.body;
      if (name && price && url) {
        const id = productosBefore.length + 1;
        mongoose.connect(uri, {}, (error) => {
          if (error) {
            logger.error(err);
            return;
          }
          console.log("db connected");
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
  routerProducts.post("/actualizarProd", (req, res) => {
    const { id, name, price, url, descripcion, codigo, stock } = req.body;
    if (name && price && url && id && descripcion && codigo && stock) {
      mongoose.connect(uri, {}, (error) => {
        if (error) {
          logger.error(err);
          return;
        }
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
            logger.error(err);
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
  routerProducts.post("/eliminarProd", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productos = data;
      const total = productos.length;
      const { id } = req.body;
      if (id <= total) {
        mongoose.connect(uri, {}, (error) => {
          if (error) {
            logger.error(err);
            return;
          }
        });

        Users.findOneAndRemove({ id: id }, function (err, docs) {
          if (err) {
            logger.error(err);
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
});

module.exports = routerProducts;
