const express = require("express");
const routerProducts = require("./products.router");
const routerCarrito = require("./carrito.router");
const fs = require("fs");

const PORT = 8080;

const productos = require("../proyectoFinal/products/products.json");

const app = express();

//middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

// admin // Manipular los productos con FrontEnd //

app.get("/api/admin", (req, res) => {
  res.render("page.ejs", { productos });
});

app.get("/api/admin/:id", (req, res) => {
  const id = req.params.id;
  function productById(id) {
    const data = productos;
    const respuesta = data.find((res) => res.id == id);
    return respuesta;
  }
  const pepe = productById(id);

  res.send(pepe);
});

app.post("/addProd", (req, res) => {
  const { name, price, url } = req.body;
  if (name && price && url) {
    const id = productos.length + 1;
    const NewProducts = { id, ...req.body };
    productos.push(NewProducts);
    fs.writeFileSync(
      "products/products.json",
      JSON.stringify(productos),
      "utf-8"
    );
    res.render("page.ejs", { productos });
  } else {
    res.status(500).json({
      Error: "Solo puede ingresar datos validos",
      help: "Debe ingresar 'name', 'price', 'url' ",
    });
  }
});

app.post("/actualizarProd", (req, res) => {
  const { id, name, price, url, descripcion, codigo, stock } = req.body;
  if (name && price && url && id && descripcion && codigo && stock) {
    productos.forEach((e) => {
      if (e.id == id) {
        e.name = name;
        e.price = price;
        e.url = url;
        e.descripcion = descripcion;
        e.codigo = codigo;
        e.stock = stock;
      }
    });
    fs.writeFileSync(
      "products/products.json",
      JSON.stringify(productos),
      "utf-8"
    );
    res.render("page.ejs", { productos });
  } else {
    res.status(500).json({
      Error: "Faltan datos importantes",
    });
  }
});

app.post("/eliminarProd", (req, res) => {
  const total = productos.length;
  const { id } = req.body;
  if (id <= total) {
    productos.forEach((e, i) => {
      if (e.id == id) {
        productos.splice(i, 1);
      }
    });
    fs.writeFileSync(
      "products/products.json",
      JSON.stringify(productos),
      "utf-8"
    );
    res.render("page.ejs", { productos });
  } else {
    res.send("Ese producto no existe");
  }
});
//routes //

app.use("/api/products", routerProducts);
app.use("/api/carrito", routerCarrito);

app.listen(PORT, () => {
  console.log("trabajan2...");
});
