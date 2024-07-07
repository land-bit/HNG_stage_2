import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Welcome to this API!`);
});

app.listen(port, () => console.log("listening on port : " + port));
