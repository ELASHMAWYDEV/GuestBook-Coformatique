const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../../db");
const ObjectId = require("mongodb").ObjectID;
const crypto = require("crypto");
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN;
const bcrypt = require("bcrypt");

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

    //send mail to the user with the reset token
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

/**************************************/

router.post("/submit", async (req, res) => {
  try {
    //Initial @params
    let user = req.body;
    let errors = [];

    //check for empty inputs
    if (!user.password) errors.push("The password mustn't be empty");
    if (!user.passwordConfirm)
      errors.push("The password confirmation mustn't be empty");
    if (!user.resetToken)
      errors.push("You must open the reset link from your email");

    //validate password
    if (user.password && user.password.length < 6)
      errors.push("The password must be at least 6 characters");
    if (user.password != user.passwordConfirm)
      errors.push("The password & password confirmation are not the same");

    //if any errors occured ===> STOP & send errors
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //check for reset token in DB
    let userSearch = await db
      .collection("users")
      .findOne({ resetToken: user.resetToken });

    //if user doesn't exist in DB ===> STOP
    if (!userSearch) {
      return res.json({
        success: false,
        errors: [
          "You have already reseted your password, if that wasn't true. open the reset link from your email again",
        ],
      });
    } else {
      //update the password in DB
      let hashedPassword = await bcrypt.hash(user.password, 10);
      let userUpdated = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(userSearch._id) },
          { $unset: { resetToken: "" }, $set: { password: hashedPassword } }
        );

      //if any errors on storing token ===> STOP
      if (!userUpdated.value) {
        return res.json({
          success: false,
          errors: ["Error occured, please contact the developer"],
        });
      } else {
        return res.json({
          success: true,
          messages: ["The password was updated successfully"],
        });
      }
    }
  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`],
    });
  }
});

module.exports = router;
