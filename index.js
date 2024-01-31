const express = require("express");
const mongoose = require("mongoose");
const { urlRouter } = require("./routes/url");
const app = express();
const PORT = 8000;

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/short_url")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
