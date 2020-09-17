const express = require("express");
const router = express.Router();


//sub-routes
router.use("/login", require("./login"));
router.use("/register", require("./register"));
router.use("/reset", require("./reset"));


module.exports = router;