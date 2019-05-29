const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
dotenv.config();

const authRoutes = require("./routes/auth");

const mongoConnection = require("./db/db");
app.use(express.json());

app.use("/api/user", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Running on the PORT ${PORT}`);
});
