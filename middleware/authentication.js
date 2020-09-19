const db = require("../db");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN || "randomaccesstoken";

const authentication = async (req, res, next) => {
  try {
    //must use signed cookies for security purposes
    let accessToken = req.signedCookies["@access_token"];

    //check if access token is set in cookie
    if (!accessToken) {
      req.user = null;
      next();
      return;
    } else {
      let user = jwt.verify(accessToken, SECRET_TOKEN);

      //check if the user has the token in db
      let userSearch = await db
        .collection("users")
        .findOne({ _id: ObjectId(user._id), accessToken: accessToken });
      if (!userSearch) {
        req.user = null;
      } else {
        req.user = user;
      }
      next();
    }
  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`],
    });
  }
};

module.exports = authentication;
