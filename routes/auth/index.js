const express = require("express");
const router = express.Router();
const authentication = require("../../middleware/authentication");

//middleware
router.use(authentication);

//sub-routes
router.use("/login", require("./login"));
router.use("/register", require("./register"));
router.use("/reset", require("./reset"));


module.exports = router;