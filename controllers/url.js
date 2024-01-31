const shortid = require("shortid");
const { URL } = require("../models/url");
const handleGenerateShortUrl = async (req, res) => {
  const shortId = shortid();
  if (!req.body) {
    return res.status(400).json({ message: "Bad request" });
  }

  const result = await URL.create({
    shortId: shortId,
    redirectUrl: req.body.url,
    visitHistory: [],
  });
  return res.status(201).json({ id: result.shortId });
};

const handleRedirect = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timeStamp: new Date(),
        },
      },
    }
  );
  res.redirect(result.redirectUrl);
};

const handleAnalyticsShortId = async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ message: "Bad request" });
  }
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateShortUrl,
  handleRedirect,
  handleAnalyticsShortId,
};
