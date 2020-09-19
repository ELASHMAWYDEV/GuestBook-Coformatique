const express = require("express");
const router = express.Router();
const db = require("../../db");
const ObjectId = require("mongodb").ObjectId;




router.post("/", async (req, res) => {
  try {
    //check if user has credentials
    if (!req.user) {
      return res.json({
        success: false,
        errors: ["You are not allowed to edit this message"]
      });
    }

    //Initial params
    let message = req.body;
    let errors = [];

    //handle input errors
    if (message.msg.length < 20) errors.push("Your message must have at least 20 characters");
    //handle development errors
    if (!message._id) errors.push("Error occured: Please call the developer, 101");
    if (!message.user_id) errors.push("Error occured: Please call the developer, 102");

    //If any errors occured ===> STOP
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors
      });
    }

    //PROCEED if all is OK
    let newMessage = await db.collection("messages").findOneAndUpdate({ _id: ObjectId(message._id), user_id: req.user._id }, { $set: { msg: message.msg } }, { returnOriginal: false });
    
    if (newMessage.value) {
      return res.json({
        success: true,
        messages: ["Your message was updated successfully"],
        newMessage: newMessage.value
      });
    } else {
      return res.json({
        success: false,
        errors: ["Sorry, you are not allowed to edit this message."]
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