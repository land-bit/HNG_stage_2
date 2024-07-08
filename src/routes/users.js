import { Router } from "express";
import { getUser } from "../controllers/get.js";
import { deleteUser } from "../controllers/delete.js";

const user = Router();

user.get("/", getUser);
user.delete("/", deleteUser);

export default user;
