// implement your API here

const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("something is happening");
});

server.get("/users", (req, res) => {
  db.users
    .find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.json({ error: err, message: "cant get data" });
    });
});

server.post("/api/users", (req, res) => {
  const userInformation = req.body;
  console.log("request body: ", userInformation);

  db.users
    .insert(userInformation)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Please provide name and bio for the user." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.users
    .remove(userId)
    .then(deleted => {
      res.status(404).end();
    })
    .catch(err => {
      res.status(500).json({ error: err, message:  "The user with the specified ID does not exist." });
    });
});

server.put("/api/users/:id", (req, res) => {
  db.users

})

server.listen(5000, () => {
  console.log("\n*** API running on port 5k ***\n");
});


