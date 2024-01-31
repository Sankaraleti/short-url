const express = require("express");
const {
  handleGenerateShortUrl,
  handleRedirect,
  handleAnalyticsShortId,
} = require("../controllers/url");
const urlRouter = express.Router();

urlRouter.post("/", handleGenerateShortUrl);
urlRouter.get("/:shortId", handleRedirect);
urlRouter.get("/analytics/:shortId", handleAnalyticsShortId);

module.exports = { urlRouter };
