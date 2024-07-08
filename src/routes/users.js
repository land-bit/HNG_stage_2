import { Router } from "express";
import { getOneUsers, getUsers } from "../controllers/get.js";
import { token } from "../middlewares/token.js";

const users = Router();

users.get("/", getUsers);

users.get("/:id", token, getOneUsers);

export default users;
