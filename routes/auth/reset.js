const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../../db");
const ObjectId = require("mongodb").ObjectID;
const crypto = require("crypto");
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN;

router.post("/", async (req, res) => {
  try {
    //Initial @params
    let user = req.body;

    //check for empty inputs
    if (!user.user) {
      return res.json({
        success: false,
        errors: ["You must type your username or email"],
      });
    }

    //check for user in DB
    let userSearch = await db
      .collection("users")
      .findOne({ $or: [{ email: user.user }, { username: user.user }] });

    //if user doesn't exist in DB ===> STOP
    if (!userSearch) {
      return res.json({
        success: false,
        errors: ["You must type your username or email"],
      });
    }

    //ALL is OK ===> save the temporary reset token in DB and send it in mail
    const resetToken = crypto.randomBytes(32).toString("hex");
    let storeToken = await db.collection("users").findOneAndUpdate(
      {
        _id: ObjectId(userSearch._id),
      },
      {
        $set: {
          resetToken,
        },
      }
    );

    //if any errors on storing token ===> STOP
    if (!storeToken.value) {
      return res.json({
        success: false,
        errors: ["Error occured, please contact the developer"],
      });
    }

    //send mail to the user with the reset token ("I used test gmail account for this purpose, you are free to steel it :D")
    const transporter = nodemailer.createTransport({
      pool: true,
      host: "elashmawydev.com",
      port: 465,
      secure: true,
      auth: {
        user: "coformatique@elashmawydev.com",
        pass: "123456qwer$",
      },
    });

    const mailOptions = {
      from: "coformatique@elashmawydev.com",
      to: userSearch.email,
      subject: "Reset password - Guest Book",
      html: `
      <div style="background-color: #394244;padding: 40px 10px;border-radius: 10px;over-flow: hidden;">
        <h1 style="color: #C8D6E5;margin: 0 auto 30px;font-family: 'Ubuntu';text-align: center;">Guest Book</h1>
        <h4 style="text-align: center; flex: 1;border-radius: 15px;background-color: #ff6b6b; padding: 20px 10px;margin: 15px;font-family: 'Ubuntu'">You requested to reset your password</h4>
        <h4 style="text-align: center;margin: 20px auto;font-family: 'Ubuntu'">To reset it</h4>
        <h2 style="margin: 10px auto;width: max-content;font-family: 'Ubuntu'"><a href=${CLIENT_DOMAIN}/reset/${resetToken} style="color: white; background-color: #54a0ff; padding: 5px 20px;border-radius: 15px;">click here</a></h2>
      </div>

      `,
    };

    let mailResponse = await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      messages: ["Reset link was sent to your email"],
      info: mailResponse,
    });
  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`],
    });
  }
});

module.exports = router;
