const express = require("express");
const router = express.Router();
const db = require("../../db");
const ObjectId = require("mongodb").ObjectId;

//To clear the @access_token cookie from the client and from DB

router.post("/", async (req, res) => {
  try {

    if (req.user) {
      //remove token from DB
      await db.collection("users").findOneAndUpdate({ _id: ObjectId(req.user._id) }, { $unset: { accessToken: "" } });
    }

    //clear the cookie
    res.clearCookie("@access_token");
  
    //send a success response
    return res.json({
      success: true,
      messages: ["You logged out"]
    });

  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`]
    })
  }
 
});

module.exports = router;
