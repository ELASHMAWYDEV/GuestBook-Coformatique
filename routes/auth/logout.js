const express = require("express");
const router = express.Router();

//To clear the @access_token cookie from the client

router.post("/", (req, res) => {
  res.cookie("@access_token", null, {
    maxAge: 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV == "production" ? true : false,
  });
  res.json({
    success: true,
    messages: ["You logged out"]
  })
});

module.exports = router;
