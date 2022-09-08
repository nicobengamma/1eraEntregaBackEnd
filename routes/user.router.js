const express = require("express");
const { Router } = express;
const routerUser = Router();
const mongoose = require("mongoose");
const client = require("../mongoDB/server");
const Users = require("../mongoDB/schema.users");
const Logins = require("../mongoDB/schema.logins");
const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://admin:admin@cluster0.uo708jn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

client.connect(() => {
  const collection = client.db("myFirstDatabase").collection("users");
  const usuarios = client.db("myFirstDatabase").collection("logins");
  routerUser.get("/", (req, res) => {
    res.send("ok");
  });
  routerUser.post("/registro", (req, res) => {
    const { usuario, password } = req.body;
    usuarios.findOne({ usuario: usuario }).then((r) => {
      if (!r) {
        mongoose.connect(uri, {}, (err) => {
          if (err) {
            console.log(err);
          }
        });
        bcrypt.hash(password, 12).then(function (hashedPassword) {
          const nUsuario = new Logins({
            usuario: usuario,
            password: hashedPassword,
          });
          return nUsuario.save().then((r) => console.log(r));
        });
        setTimeout(() => {
          collection.find({}).toArray((err, data) => {
            const productos = data;
            res.render("page.ejs", { productos });
          });
        }, 2000);
      } else {
        res.send("<h1>El Usuario Ya existe, Intente con otro !</h1>");
      }
    });
  });
  routerUser.post("/login", (req, res) => {});
});

module.exports = routerUser;
