import { body } from "express-validator";

// "userId": "string" // must be unique
// "firstName": "string", // must not be null
// "lastName": "string" // must not be null
// "email": "string" // must be unique and must not be null
// "password": "string" // must not be null
// "phone": "string"

export const registerUser = () => [
  body("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .escape()
    .withMessage("firstName must not contain HTML")
    .isString()
    .withMessage("firstName must be a string"),

  body("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .escape()
    .withMessage("lastName must not contain HTML")
    .isString()
    .withMessage("lastName must be a string"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .escape()
    .withMessage("email must not contain HTML")
    .isEmail()
    .withMessage("email must be an email address"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .escape()
    .withMessage("password must not contain HTML")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .isString()
    .withMessage("password must be a string"),

  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .escape()
    .withMessage("phone must not contain HTML")
    .isString()
    .withMessage("phone must be a string"),
];
