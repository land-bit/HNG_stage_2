import { Router } from "express";
import { registerUser } from "../middlewares/expressvalidator.js";
import { createUser } from "../controllers/post.js";

const register = Router();

register.post("/", registerUser, createUser);

export default register;
