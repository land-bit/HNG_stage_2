import { Router } from "express";
import { registerUser } from "../middlewares/expressvalidator";
import { createUser } from "../controllers/post";

const register = Router();

register.post("/", registerUser, createUser);

export default register;
