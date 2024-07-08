import { Router } from "express";
import { token } from "../middlewares/token.js";
import { getOneOrganisation, getOrganizations } from "../controllers/get.js";
import { verifyOrganisation } from "../middlewares/expressvalidator.js";
import { createOrganisation } from "../controllers/post.js";

const organisations = Router();

organisations.get("/", token, getOrganizations);

organisations.get("/:id", token, getOneOrganisation);

organisations.post("/", token, verifyOrganisation, createOrganisation);

export default organisations;
