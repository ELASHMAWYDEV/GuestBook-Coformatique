const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/", async (req, res) => {
  try {
    //check if user has credentials
    if (!req.user) {
      return res.json({
        success: false,
        errors: ["You must login first to add messages"],
      });
    }

    //Initial params
    let message = req.body;
    let errors = [];

    //handle input errors
    if (message.msg.length < 20)
      errors.push("Your message must have at least 20 characters");

    //If any errors occured ===> STOP
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //PROCEED if all is OK
    let storeMessage = await db
      .collection("messages")
      .insertOne({ msg: message.msg, user_id: req.user._id, username: req.user.username, createdAt: new Date().getTime() });

    if (storeMessage && storeMessage.insertedCount != 0) {
      return res.json({
        success: true,
        messages: ["Your message was added successfully"],
        msg: storeMessage.ops[0],
      });
    } else {
      return res.json({
        success: false,
        errors: ["Error occured: Please call the developer, 105"],
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
