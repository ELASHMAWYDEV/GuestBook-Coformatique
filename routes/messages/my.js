const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/", async (req, res) => {
  try {
    //check if user has credentials
    if (!req.user) {
      return res.json({
        success: false,
        errors: ["You must login first to view your messages"],
      });
    }

    //If any errors occured ===> STOP
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //PROCEED if all is OK
    let getMessages = await db
      .collection("messages")
      .find({ user_id: req.user._id }).toArray();

    if (getMessages.length != 0) {
      return res.json({
        success: true,
        messages: ["Your message was added successfully"],
        getMessages
      });
    } else {
      return res.json({
        success: false,
        errors: ["You have not written any messages"],
      });
    }
    
  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`],
    });
  }
});

module.exports = router;
