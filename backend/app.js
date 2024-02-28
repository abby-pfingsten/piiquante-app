// mongodb+srv://abbypfingsten:<password>@cluster0.47dfkhh.mongodb.net/?retryWrites=true&w=majority
// q1QVxPKmpLhPD5fF
// npm install mongodb@3.6
//  http://localhost:4200
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const stuffRoutes = require("./routes/stuff");
// const userRoutes = require("./routes/user");
const app = express();

mongoose
  .connect(
    "mongodb+srv://abbypfingsten:q1QVxPKmpLhPD5fF@cluster0.47dfkhh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successful mongoose connection.");
  })

  .catch((error) => {
    console.log("Connection was unsuccessful");
    console.error(error);
  });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use("/api/stuff", stuffRoutes);
// app.use("/api/auth", userRoutes);

module.exports = app;
