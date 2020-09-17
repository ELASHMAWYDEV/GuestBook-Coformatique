const db = require("../db");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN || "randomaccesstoken";

const authentication = async (req, res, next) => {
  try {

    let accessToken = req.cookies["@access_token"]

    //check if access token is set in cookie
    if (!accessToken) {
      req.user = null;
      next();
      return;
    } else {
      let user = jwt.verify(accessToken, SECRET_TOKEN);
      console.log(user);
      next();
    }
  
  } catch (e) {
    return res.json({
      success: false,
      errors: [`Error occured: ${e.message}`],
    });
  }
  


}


module.exports = authentication;