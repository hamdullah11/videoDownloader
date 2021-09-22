import express from "express";
import mongoose from "mongoose";
import Credentials from "./credentials.js";

// App Config
const app = express();

app.use(express.json());
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

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
