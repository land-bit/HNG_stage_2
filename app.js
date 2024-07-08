import express from "express";
import register from "./src/routes/register.js";
import login from "./src/routes/login.js";
import user from "./src/routes/users.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth/login", login);

app.use("/auth/register", register);

app.use("/user", user);

app.get("/", (req, res) => {
  res.send(`Welcome to this API!`);
});

app.listen(port, () => console.log("listening on port : " + port));
