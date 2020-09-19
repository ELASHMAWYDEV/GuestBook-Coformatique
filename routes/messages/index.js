const express = require("express");
const router = express.Router();
const authentication = require("../../middleware/authentication");

//middleware
router.use(authentication);

//sub-routes
router.use("/add", require("./add"));
router.use("/edit", require("./edit"));
router.use("/delete", require("./delete"));
router.use("/all", require("./all"));

module.exports = router;