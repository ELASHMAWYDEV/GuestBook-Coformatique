const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_TOKEN = process.env.SECRET_TOKEN || "randomaccesstoken";
const db = require("../../db");
const ObjectId = require("mongodb").ObjectId;
const validator = require("email-validator");

router.post("/", async (req, res) => {
  try {
    //Initial @params
    let user = req.body;
    let errors = [];

    /*-----------VALIDATION START-----------*/
    //check for empty inputs
    if (!user.username) errors.push("The username mustn't be empty");
    if (!user.email) errors.push("The email mustn't be empty");
    if (!user.password) errors.push("The password mustn't be empty");
    if (!user.passwordConfirm)
      errors.push("The password confirmation mustn't be empty");
    if (!user.username) errors.push("The username mustn't be empty");

    //validate password
    if (user.password && user.password.length < 6)
      errors.push("The password must be at least 6 characters");
    if (user.password != user.passwordConfirm)
      errors.push("The password & password confirmation are not the same");

    //validate email
    if (!validator.validate(user.email))
      errors.push("This email address is not valid");

    //check for email in DB
    const emailSearch = await db
      .collection("users")
      .findOne({ email: user.email });
    if (emailSearch) errors.push("This email account is already registered");

    //check for username in DB
    const usernameSearch = await db
      .collection("users")
      .findOne({ username: user.username });
    if (usernameSearch) errors.push("This username is used, pick another one");
    /*-----------VALIDATION END-----------*/

    //if any errors occured ===> STOP & send errors
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //No errors ===> PROCEED

    //Hash the passowrd
    let hashedPassword = await bcrypt.hash(user.password, 10);

    //save the user in DB
    let userResult = await db.collection("users").insertOne({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      createdAt: new Date().getTime()
    });

    if (userResult && userResult.insertedCount != 0) {
      //Create the access token, save it to DB and send it in a cookie
      const accessToken = jwt.sign(userResult.ops[0], SECRET_TOKEN);
      const storeToken = await db.collection("users").findOneAndUpdate(
        { _id: ObjectId(userResult.ops[0]._id) },
        {
          $set: {
            accessToken,
          },
        },
        {
          returnOriginal: false
        }
      );

      //In case any errors occured "which wil not :D"
      if (!storeToken.value) {
        return res.json({
          success: false,
          errors: ["Error occured, please contact the developer"]
        })
      }

      //send access token in cookie
      res.cookie("@access_token", accessToken, {
        maxAge: 86400,
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
        signed: true,
      });

      //delete password from user object
      delete userResult.ops[0].password;

      return res.json({
        success: true,
        messages: ["Your account have been successfully registered"],
        user: userResult.ops[0]
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
