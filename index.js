const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://Admin102:RkLynzN6OLdIIvLN@cluster0.cnotlwz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    const userCollection = client.db("simpledata").collection("users");

    // Get the user Data by the Database
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // create a document to insert
    app.post("/users", async (req, res) => {
      console.log("Post API Hit...");
      const user = req.body;
      const result = await userCollection.insertOne(user);
      user.id = result.insertedId;
      res.send(user);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// app.get("/users", (req, res) => {
//   if (req.query.name) {
//     const search = req.query.name;
//     const filtered = users.filter(
//       (usr) => usr.name.toLowerCase().indexOf(search) >= 0
//     );
//     res.send(filtered);
//   } else {
//     res.send(users);
//   }
// });

// app.post("/users", (req, res) => {
//   console.log("Post API Hit...");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   console.log(user);
//   res.send(user);
// });

app.listen(port, () => {
  console.log(`Data Server is Runnig on Port ${port}`);
});
