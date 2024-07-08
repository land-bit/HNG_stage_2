import { Router } from "express";
import { token } from "../middlewares/token.js";
import { getOneOrganisation, getOrganizations } from "../controllers/get.js";

const organisations = Router();

organisations.get("/", token, getOrganizations);

organisations.get("/:id", token, getOneOrganisation);

export default organisations;
