const mongoose = require("mongoose");
const url =
  "mongodb+srv://admin:admin@cluster0.uo708jn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url, {}, (error) => {
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

// const nuevoUsuario = new Users({
//   id: 3,
//   name: "El Pepe",
//   descripcion: "Es el pepeee",
//   codigo: "4",
//   price: "100.000",
//   stock: "1",
//   url: "https://www.sopitas.com/wp-content/uploads/2020/10/meme-el-pepe-ete-sech-origen.png",
// });

// nuevoUsuario.save().then(() => console.log("dato guardado"));
