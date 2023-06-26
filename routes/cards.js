const express = require("express");
const router = express.Router({ mergeParams: true });
const Card = require("../models/card.js");

router.get("/", async function (req, res, next) {
  try {
    const cards = await Card.assignCardsToGame();
    return res.json({ cards });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
