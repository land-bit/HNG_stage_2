import { Router } from "express";
import { token } from "../middlewares/token.js";
import { getOneOrganisation, getOrganizations } from "../controllers/get.js";
import {
  verifyOrganisation,
  verifyUser,
} from "../middlewares/expressvalidator.js";
import { addUser, createOrganisation } from "../controllers/post.js";

const organisations = Router();

organisations.get("/", token, getOrganizations);

organisations.get("/:id", token, getOneOrganisation);

organisations.post("/", token, verifyOrganisation, createOrganisation);

organisations.post("/:orgId/users", token, verifyUser, addUser);

export default organisations;
