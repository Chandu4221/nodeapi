const router = require("express").Router();
const User = require("../db/models/userModel");

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  try {
    console.log(req.body.name, req.body.password, req.body.email);
    const saveUser = await newUser.save();
    res.status(200).send("success");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/register", (req, res) => {
  res.send("registered user details");
});

module.exports = router;
