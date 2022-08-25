const express = require("express");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.uo708jn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("myFirstDatabase").collection("users");
  app.get("/", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.json(data);
    });
  });
  app.listen(8080);
});
