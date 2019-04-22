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
      console.log(users)
      res.status(201).json(users);
    })
    .catch(err => {
      res.json({ error: err, message: "cant get data" });
    });
});
server.get("/api/users/:id", (req, res) => {
  userId = req.params.id;
  if (userId) {
    db.findById(userId)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The user information could not be retrieved" });
      });
  } else {
    res
      .status(404)
      .json({ error: "The user with the specified ID does not exist" });
  }
});
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log("request body: ", newUser);

  if (newUser) {
    db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    });
  } else {
    res
    .status(500)
    .json({ error: "There was an error while saving the user to the database" })
  }
});

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.users
    .remove(userId)
    .then(deleted => {
      res.status(404).end();
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: err,
          message: "The user with the specified ID does not exist."
        });
    });
});

server.put("/api/users/:id", (req, res) => {
  const userChange = req.params.id;
  if(userChange){
    db.update(userChange)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(404)
        .json({
          error: err,
          message: "The user with the specified ID does not exist." });
        });
      } else {
        res
        .status(400)
        .json({
           errorMessage: "Please provide name and bio for the user." 
        });
      
    
      } if else {
        res
        .status(500)
        .json({
          error: "The user information could not be modified."
        });
      }
})

server.listen(5000, () => {
  console.log("\n*** API running on port 5k ***\n");
});
