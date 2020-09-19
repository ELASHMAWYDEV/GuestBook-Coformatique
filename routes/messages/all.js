const express = require("express");
const router = express.Router();
const db = require("../../db");


router.post("/", (req, res) => {
  try {

    let messages = await db.collection("messages").find({}).toArray();
    
    if (messages.length != 0) {
      return res.json({
        success: true,
        messages
      });
    } else {
      return res.json({
        success: false,
        errors: ["There are no messages to show at the moment"]
      });
    }
    
  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`]
    });
  }

})

module.exports = router;