// implement your API here

const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send();
});

server.get("/users", (req, res) => {
  db.users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json({ error: err, message: "Something broke" });
    });
});

server.post("/api/users", (req, res) => {
  const userInformation = req.body;
  console.log("request body: ", userInformation);

  db.users
    .add(userInformation)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error adding the hub" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.users
    .remove(userId)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error deleting the user" });
    });
});

server.listen(5000, () => {
  console.log("\n*** API running on port 5k ***\n");
});

/*

1. install express with "yarn add express" or "npm i express"
2. run it with "yarn server"

*/
