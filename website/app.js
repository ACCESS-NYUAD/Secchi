const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes");
app.use("/", router);

module.exports = app;
