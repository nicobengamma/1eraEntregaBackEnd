const express = require("express");

const app = express();

const PORT = process.argv[2] || 8080;

app.get("/data", (req, res) => {
  console.log("Port :"[PORT]);
  res.send(`Funcionando en: ${PORT}`);
});

app.listen(PORT, (err) => {
  if (!err) console.log("error");
});
