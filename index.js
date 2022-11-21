const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middle ware

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Data Server is Running...");
});

app.listen(port, () => {
  console.log(`Data Server is Runnig on Port ${port}`);
});
