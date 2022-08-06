const bot = require("./bot");

const express = reqyure("express");
const bot = require("./bot");
const app = express();


app.get("/", async (req, res) => {
  const response = await bot();

  res.send(response);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on Port ${PORT}...`);
});

