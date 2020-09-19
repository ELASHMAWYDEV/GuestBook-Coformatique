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
router.use("/my", require("./my"));
router.use("/read", require("./read"));
router.use("/reply", require("./reply"));

module.exports = router;