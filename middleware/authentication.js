const authentication = (req, res, next) => {
  console.log(req.cookies["@access_token"]);
  next();
}


module.exports = authentication;