const router = require("Express").Router();

const Accounts = require("../data/accounts-model.js");

router.get("/", (req, res) => {
  res.status(200).send("Accounts");
});

module.exports = router;
