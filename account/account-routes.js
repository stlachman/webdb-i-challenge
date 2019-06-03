const router = require("Express").Router();

const Accounts = require("../data/accounts-model.js");

// CREATE - POST /accounts
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

// READ - GET /accounts
router.get("/", (req, res) => {
  Accounts.find()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Retrieving Account" });
    });
});

// READ - GET /accounts/:id
router.get("/:id", validateAccountId, (req, res) => {
  res.status(200).json(req.account);
});

// UPDATE - PUT /accounts/:id
router.put("/:id", validateAccountId, (req, res) => {
  const updatedAccount = req.body;
  if (updatedAccount.name || updatedAccount.budget) {
    Accounts.update(req.account.id, updatedAccount)
      .then(account => {
        res.status(201).json(account);
      })
      .catch(err => {
        res.status(500).json({ message: "Error updating account" });
      });
  } else {
    res.status(400).json({
      message: "Please provide an update to either the name or budget field"
    });
  }
});

// DELETE - DELETE /accounts/:id

router.delete("/:id", validateAccountId, (req, res) => {
  Accounts.remove(req.account.id)
    .then(account => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: "Error removing account." });
    });
});

function validateAccountId(req, res, next) {
  const accountId = req.params.id;
  Accounts.findById(accountId)
    .then(account => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(400).json({ message: "No account with that id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving account " });
    });
}

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
