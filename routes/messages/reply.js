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
        errors: ["You must login first to reply to this message"],
      });
    }

    //Initial params
    let { reply, message } = req.body;
    let errors = [];

    //handle input errors
    if (!reply) errors.push("You must type any thing to reply");
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
    let storeReply = await db
      .collection("messages")
      .findOneAndUpdate(
        { _id: ObjectId(message._id) },
        {
          $push: {
            replies: {
              user_id: req.user._id,
              reply: reply,
              username: req.user._id,
            },
          },
        },
        { returnOriginal: false }
      );

    if (storeReply.value) {
      return res.json({
        success: true,
        messages: ["Your reply was submitted successfully"],
      });
    } else {
      return res.json({
        success: false,
        errors: ["Sorry, you are not allowed to reply to this message."],
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
