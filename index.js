const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
dotenv.config();

const authRoutes = require("./routes/auth");

const mongoConnection = require("./db/db");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Running on the PORT ${PORT}`);
});
