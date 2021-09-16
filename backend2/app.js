const express = require("express");
const mongoose = require("mongoose");
const Review = require("./models/profreview");
const ProfProfile = require("./models/profprofile");
require("dotenv/config");
// const bodyParser = require("body-parser");
// var fs = require("fs");
var path = require("path");
const multer = require("multer");

const Profile = require("./routes/profProfiles");

// express app
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.set("view engine", "ejs");

app.use(express.static(__dirname + "./public/"));

// connection to mongodb cloud
const dbURL = process.env.MONGO_URL;
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(4000);
    console.log("connected");
  })
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../prof/public/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1021 * 1024 * 5,
  },
});

app.get("/profs", (req, res) => {
  res.render("imagesPage");
});

// app.get("/profs/:id", (req, res) => {
//   const filename = req.params.id;
//   ProfProfile.find({ _id: filename }, (err, results) => {
//     console.log(results);
//     res.send(results.image);
//   });
// });

app.post("/profs", upload.single("file"), (req, res, next) => {
  const profile = new ProfProfile({
    name: req.body.name,
    domain: req.body.domain,
    college: req.body.college,
    breif: req.body.breif,
    details: req.body.details,
    email_id: req.body.email_id,
    researchgate: req.body.researchgate,
    image: req.file.filename,
  });

  profile
    .save()
    .then((results) => {
      console.log("Added data");
    })
    .catch((err) => console.log(err));

  res.send("img");
});

app.use(Profile);

app.use((req, res) => {
  res.status(404).send("<h1>OOPs 404 </h1>");
});
