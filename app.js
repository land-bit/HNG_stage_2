import express from "express";
import register from "./src/routes/register";

const app = express();

const port = process.env.PORT || 3000;

app.use("/auth/register", register);

app.get("/", (req, res) => {
  res.send(`Welcome to this API!`);
});

app.listen(port, () => console.log("listening on port : " + port));
