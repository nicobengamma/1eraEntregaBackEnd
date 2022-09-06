const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const app = express();
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://admin:ojbVLNj5HUATQRVh@cluster0.uo708jn.mongodb.net/?retryWrites=true&w=majority",
      advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "turing",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`<h1>views ${req.session.views}</h1>`);
  } else {
    req.session.views = 1;
    res.send("Welcome");
  }
});

app.listen(8080);
