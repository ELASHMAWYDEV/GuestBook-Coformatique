const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_TOKEN = process.env.SECRET_TOKEN || "randomaccesstoken";
const db = require("../../db");
const ObjectId = require("mongodb").ObjectId;

router.post("/", async (req, res) => {
  try {
    //Initial @params
    let user = req.body;
    let errors = [];

    /*-----------VALIDATION START-----------*/
    //check for empty inputs
    if (!user.user) errors.push("The username or email mustn't be empty");
    if (!user.password) errors.push("The password mustn't be empty");

    //check for email or username in DB
    const userSearch = await db
      .collection("users")
      .findOne({ $or: [{ email: user.user }, { username: user.user }] });
    if (!userSearch) errors.push("This email or username is not registered");

    /*-----------VALIDATION END-----------*/

    //if any errors occured ===> STOP
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    if (!(await bcrypt.compare(user.password, userSearch.password))) {
      return res.json({
        success: false,
        errors: ["The password is incorrect"],
      });
    } else {
      //Password OK ===> PROCEED

      //delete the stored access token (if any)
      delete userSearch.accessToken;

      //Create the access token
      const accessToken = jwt.sign(userSearch, SECRET_TOKEN);

      //store the token to the user in DB
      let storeToken = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(userSearch._id) },
          { $set: { accessToken, lastLogin: new Date().getTime() } },
          { returnOriginal: false }
        );

      //if any errors on storing token ===> STOP
      if (!storeToken.value) {
        return res.json({
          success: false,
          errors: ["Error occured, please contact the developer"],
        });
      }

      //send access token in cookie
      res.cookie("@access_token", accessToken, {
        maxAge: 86400 * 1000,
        httpOnly: true,
      });

      //delete password from user object
      delete userSearch.password;
      return res.json({
        success: true,
        messages: ["You have successfully logged in"],
        user: userSearch,
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
