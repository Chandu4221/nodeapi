const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
const authVerify = require("./middlewares/verifyToken");
dotenv.config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const mongoConnection = require("./db/db");
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/posts", authVerify, postRoutes);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Running on the PORT ${PORT}`);
});
