const router = require("Express").Router();

const Accounts = require("../data/accounts-model.js");

// GET /accounts
router.get("/", (req, res) => {
  Accounts.find()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Retrieving Account" });
    });
});

// POST /accounts
router.post("/", validateAccount, (req, res) => {
  const accountInfo = req.body;
  Accounts.add(accountInfo)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding account" });
    });
});

function validateAccount(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing account data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing account name" });
  } else if (!req.body.budget) {
    res.status(400).json({ message: "Missing account budget" });
  } else {
    next();
  }
}

module.exports = router;
