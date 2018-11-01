const express = require("express");
const app = express();

// Initial Setup
app.use("/assets", express.static("assets"));
app.set("view engine", "ejs");

// Routers
let indexRouter = require("./routers/index");
let apiRouter = require("./routers/api");

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(80);