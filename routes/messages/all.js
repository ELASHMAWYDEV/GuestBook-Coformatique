const express = require("express");
const router = express.Router();
const db = require("../../db");


router.post("/", async (req, res) => {
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

});



router.post("/unread", async (req, res) => {
  try {
    //check if user has credentials
    if (!req.user) {
      return res.json({
        success: false,
        errors: ["You must login first to view these messages"],
      });
    }


    //PROCEED if all is OK
    let messages = await db
      .collection("messages")
      .find({ read: { $nin: [req.user._id] } })
      .toArray();

    if (messages.length != 0) {
      return res.json({
        success: true,
        messages: messages,
      });
    } else {
      return res.json({
        success: false,
        errors: ["You have read all messages already"],
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