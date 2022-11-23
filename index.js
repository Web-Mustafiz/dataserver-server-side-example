const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

// creating user data
const users = [
  { id: 1, name: "Babar Azam", email: "bazam@gmail.com" },
  { id: 2, name: "Rizwan", email: "rizwan@gmail.com" },
  { id: 3, name: "Khushdil Sah", email: "kshah@gmail.com" },
  { id: 4, name: "Asif Ali", email: "aali@gmail.com" },
];
app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  console.log("Post API Hit...");
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Data Server is Runnig on Port ${port}`);
});
