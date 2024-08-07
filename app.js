import express from "express";
import register from "./src/routes/register.js";
import login from "./src/routes/login.js";
import users from "./src/routes/users.js";
import organisations from "./src/routes/organisation.js";

const app = express();

app.use(express.json());

app.use("/api/organisations", organisations);

app.use("/api/users", users);

app.use("/auth/login", login);

app.use("/auth/register", register);

app.get("/", (req, res) => {
  res.send(`Welcome to this API!`);
});

export default app;
