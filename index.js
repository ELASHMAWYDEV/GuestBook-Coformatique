const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());


//All GET requests are to be ignored
app.get("*", (req, res) => {
  res.sendStatus(404);
});




app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
