const express = require("express");
const session = require("express-session");
const sessionFile = require("session-file-store");

const FileStore = sessionFile(session);

const app = express();

app.use(
  session({
    store: new FileStore({
      path: "./mySessions",
      ttl: 300,
      retries: 0,
    }),
    secret: "turing",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(``);
  }
});
