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
        errors: ["You must login first to mark this message as read"],
      });
    }

    //Initial params
    let message = req.body.message;
    let errors = [];

    //handle development errors
    if (!message._id)
      errors.push("Error occured: Please call the developer, 101");
    if (!message.user_id)
      errors.push("Error occured: Please call the developer, 102");

    //If any errors occured ===> STOP
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //PROCEED if all is OK
    let newMessage = await db
      .collection("messages")
      .findOneAndUpdate(
        { _id: ObjectId(message._id) },
        { $push: { read: req.user._id } },
        { returnOriginal: false }
      );

    if (newMessage.value) {
      return res.json({
        success: true,
        messages: ["Your message was marked read successfully"],
        newMessage: newMessage.value,
      });
    } else {
      return res.json({
        success: false,
        errors: ["Sorry, you are not allowed to edit this message."],
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`],
    });
  }
});

router.post("/get", async (req, res) => {
  try {
    //check if user has credentials
    if (!req.user) {
      return res.json({
        success: false,
        errors: ["You must login first to view read messages"],
      });
    }


    //PROCEED if all is OK
    let messages = await db
      .collection("messages")
      .find({ read: { $in: [req.user._id] } })
      .toArray();

    if (messages.length != 0) {
      return res.json({
        success: true,
        messages: messages,
      });
    } else {
      return res.json({
        success: false,
        errors: ["You have not marked any messages as read"],
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
