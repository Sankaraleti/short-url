const express = require("express");
const mongoose = require("mongoose");
const { urlRouter } = require("./routes/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const app = express();

const PORT = 8000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect("mongodb://localhost:27017/short_url")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
app.use("/url", urlRouter);

app.use("/", staticRoute);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
