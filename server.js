import express from "express";
import mongoose from "mongoose";
import Credentials from "./credentials.js";
import cors from "cors";

// Schemas
import user from "./schemas/user.js";

// App Config
const app = express();

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
const port = process.env.port || 3000;
const connection_url =
  "mongodb+srv://TSMT:" +
  Credentials.password +
  "@cluster0.4cdpy.mongodb.net/" +
  Credentials.database +
  "?retryWrites=true&w=majority";

// Middlewares

// DB Config
mongoose.connect(connection_url);

// API Endpoints
app.get("/", (req, res) => {
  res.send("Happy Time Sheet Managing!");
});
app.get("/get/users", (req, res) => {
  user.find((err, values) => {
    res.send(values);
  });
});
app.post("/auth", (req, res) => {
  const Data = req.body;
  // res.send(Data);
  // return;
  user.findOne(Data, (err, values) => {
    // const a = JSON.stringify(values);
    // res.send(Object.entries(values));
    // return;
    if (err) res.status(500).send();
    else res.send(values);
  });
});
app.post("/user/create", (req, res) => {
  const Data = req.body;
  user.create(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
