const router = require("express").Router();
const User = require("../db/models/userModel");
const {
  validateUserRegistration,
  validateUserLogin
} = require("../validations/validations");
const hashPassword = require("../hashGenerator/passwordHash");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  //validating new user using JOI
  const { error } = validateUserRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email already exists
  const emailAlreadyExists = await User.findOne({ email: req.body.email });
  if (emailAlreadyExists)
    return res.status(400).send("Email Id Already Exists. Try Logging In");

  const newUser = new User({
    name: req.body.name,
    password: await hashPassword(req.body.password),
    email: req.body.email
  });
  try {
    const savedUser = await newUser.save();
    const { _id } = savedUser;
    res.status(200).send({ userId: _id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("Email not Registered");

  // check the password is correct

  const validPassword = await bcrypt.compareSync(
    req.body.password,
    existingUser.password
  );
  if (!validPassword) return res.status(400).send("Password Invalid");

  res.send(existingUser);
});

module.exports = router;
