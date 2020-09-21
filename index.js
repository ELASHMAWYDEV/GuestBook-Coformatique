require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

//Cors Config to be make the client side able to send cookies (JWT token)
const corsConfig = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

//middlewares
app.use(cors(corsConfig));
app.use(cookieParser(process.env.SECRET_TOKEN || "randomsecrettoken")); //a secret token is a must to create signed cookies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For the react app
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//Routes
app.use("/auth", require("./routes/auth/index"));
app.use("/messages", require("./routes/messages/index"));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
