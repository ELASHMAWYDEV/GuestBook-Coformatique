require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

//Cors Config to be make the client side able to send cookies (JWT token)
const corsConfig =
  process.env.NODE_ENV !== "production"
    ? {
        origin: "http://localhost:3000",
        credentials: true,
      }
    : {
        origin: process.env.CLIENT_DOMAIN,
        credentials: true,
      };

//middlewares
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//All GET requests are to be ignored
app.get("*", (req, res) => {
  res.sendStatus(404);
});

//Routes
app.use("/auth", require("./routes/auth/index"));
app.use("/messages", require("./routes/messages/index"));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
