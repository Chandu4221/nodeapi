var router = require("express").Router();

router.get("/", (req, res) => {
  res.send("First Post");
});

module.exports = router;
