const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//All GET requests are to be ignored
app.get("*", (req, res) => {
  res.sendStatus(404);
});




app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
