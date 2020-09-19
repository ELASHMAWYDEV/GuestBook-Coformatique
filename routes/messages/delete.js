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
        errors: ["You are not allowed to delete this message"]
      });
    }

    //Initial params
    let message = req.body.message;
    let errors = [];

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
    
    //handle accessibilty errors
    if (message.user_id != req.user._id) {
      return res.json({
        success: false,
        errors: ["You are not allowed to delete this message"]
      })
    }

    //PROCEED if all is OK
    let deleteMessage = await db.collection("messages").findOneAndDelete({ _id: ObjectId(message._id) });
    
    if (deleteMessage && deleteMessage.value) {
      return res.json({
        success: true,
        messages: ["Your message was deleted successfully"]
      });
    } else {
      return res.json({
        success: false,
        errors: ["Error occured: call the developer. 108"]
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