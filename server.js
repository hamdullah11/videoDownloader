import express from "express";
// import mongoose from "mongoose";
// import Credentials from "./credentials.js";
import cors from "cors";
// import json2xls from "json2xls";
import ytdl from "ytdl-core";

// Schemas
// import user from "./schemas/user.js";
// import level from "./schemas/level.js";
// import wbs from "./schemas/wbs.js";
// import task from "./schemas/task.js";
// import workflow from "./schemas/workflow.js";
// import progress from "./schemas/progress.js";
import request from "request";
import axios from "axios";

// App Config
const app = express();
// var json2xls = require('json2xls');

// app.use(express.json());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://y2mate.is"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(json2xls.middleware);
const port = process.env.port || 3000;
// const connection_url =
//   "mongodb+srv://pakistan:" +
//   Credentials.password +
//   "@cluster0.sfmne.mongodb.net/" +
//   Credentials.database +
//   "?retryWrites=true&w=majority";
// const connection_url =
//   "mongodb+srv://adil:" +
//   Credentials.password +
//   "@cluster0.4cdpy.mongodb.net/" +
//   Credentials.database +
//   "?retryWrites=true&w=majority";

// Middlewares

// DB Config
// mongoose.connect(connection_url, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   // useCreateIndex: true,
// });

// API Endpoints

app.get("/get_video_detail", async (req, res, next) => {
  // res.send("Happy Time Sheet Managing!" + info);\
  // let info = await ytdl.getInfo("https://www.youtube.com/watch?v=_vDo0HiTaT8");
  // console.log(info);

  // const YOUTUBE_VIDEO_ID = req.path.split("=").pop();

  req
    .pipe(
      request(`https://y2mate.is/analyze?url=${req.query.YOUTUBE_VIDEO_URL}`)
    )
    .pipe(res);

  // let info = await axios(
  //   "https://y2mate.is/analyze?url=https://www.youtube.com/watch?v=9WJyBrgWFAs",
  //   {
  //     "Access-Control-Allow-Origin": "https://y2mate.is",
  //     "Access-Control-Allow-Headers":
  //       "Origin, X-Requested-With, Content-Type, Accept",
  //     Host: "srv18.y2mate.is",
  //     Origin: "https://y2mate.is",
  //     Referer: "https://y2mate.is/",
  //     "Sec-Fetch-Mode": "cors",
  //     "Sec-Fetch-Site": "same-site",
  //   }
  // );
  // // console.log(info);
  // res.send(info);
});

app.get("/", async (req, res, next) => {
  // res.send("Happy Time Sheet Managing!" + info);\
  let info = await ytdl.getInfo("https://www.youtube.com/watch?v=_vDo0HiTaT8");
  // console.log(info);

  // let info = ytdl.videoInfo("https://youtu.be/Fnlnw8uY6jo");
  // let info = ytdl.videoInfo("https://youtu.be/Fnlnw8uY6jo");
  // res.json(ytdl);
  res.send(info);
});

app.get("/download/excel/:json", (req, res) => {
  // const jsonArr = [
  //   {
  //     foo: "bar",
  //     qux: "moo",
  //     poo: 123,
  //     stux: new Date(),
  //   },
  //   {
  //     foo: "bar",
  //     qux: "moo",
  //     poo: 345,
  //     stux: new Date(),
  //   },
  // ];
  const __ = JSON.parse(req.params.json);
  const fieldsArr = __.fields;
  const Data = __.data;
  res.xls("Master Data.xlsx", Data, {
    fields: ["ProjectName", ...fieldsArr, "Total"],
  });
});
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
