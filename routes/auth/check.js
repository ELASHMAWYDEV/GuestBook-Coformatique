const express = require("express");
const { route } = require("./login");
const router = express.Router();

/*
 *
 *
 *  THE PURPOSE OF THIS ROUTE IS TO ENSURE THE USER HAS CREDENTIALS
 *  ON CLIENT-SIDE ==> before the user access any route, send empty request
 *  to this "/auth/check" route.
 *  
 */

router.post("/", (req, res) => {
  if (req.user) {
    return res.json({
      success: true,
      messages: ["The user has credentials to access these data"],
    });
  } else {
    return res.json({
      success: false,
      errors: ["The user doesn't have credentials to access these data"],
    });
  }
});

module.exports = router;
