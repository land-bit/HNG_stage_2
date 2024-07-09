import { body } from "express-validator";

// "userId": "string" // must be unique
// "firstName": "string", // must not be null
// "lastName": "string" // must not be null
// "email": "string" // must be unique and must not be null
// "password": "string" // must not be null
// "phone": "string"

export const registerUser = [
  body("firstName")
    .notEmpty()
    .escape()
    .withMessage("firstName is required")
    .isString()
    .withMessage("firstName must be a string"),

  body("lastName")
    .notEmpty()
    .escape()
    .withMessage("lastName is required")
    .isString()
    .withMessage("lastName must be a string"),

  body("email")
    .notEmpty()
    .escape()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be an email address"),

  body("password")
    .notEmpty()
    .escape()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .isString()
    .withMessage("password must be a string"),

  body("phone").optional().isString().withMessage("phone must be a string"),
];

// {
// 	"email": "string",
// 	"password": "string",
// }

export const loginUser = [
  body("email")
    .notEmpty()
    .escape()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be an email address"),

  body("password")
    .notEmpty()
    .escape()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .isString()
    .withMessage("password must be a string"),
];

// {
// 	"name": "string", // Required and cannot be null
// 	"description": "string",
// }

export const verifyOrganisation = [
  body("name")
    .notEmpty()
    .escape()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),
];

export const verifyUser = [
  body("userId")
    .notEmpty()
    .escape()
    .withMessage("userId is required")
    .isString()
    .withMessage("userId must be a string"),
];
