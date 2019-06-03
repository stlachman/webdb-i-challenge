const express = require("express");

const server = express();

const accountRoutes = require("./account/account-routes.js");

server.use(express.json());

server.use("/accounts", accountRoutes);

server.get("/", (req, res) => {
  res.status(200).send("Databases!");
});

module.exports = server;
