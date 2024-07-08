import { Router } from "express";
import { loginController } from "../controllers/post.js";
import { loginUser } from "../middlewares/expressvalidator.js";

const login = Router();

login.post("/", loginUser, loginController);

export default login;
