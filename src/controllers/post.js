import { validationResult } from "express-validator";
import prisma from "../middlewares/prismaclientconfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const verifyEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (verifyEmail) {
      return res
        .status(422)
        .json({ field: "email", message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        organisation: {
          create: {
            name: `${firstName}'s organisation`,
          },
        },
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });

    const tokenSecret = process.env.TOKEN_SECRET || "papa";

    const token = jwt.sign({ userId: newUser.userId }, tokenSecret, {
      expiresIn: "24h",
    });
    return res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: token,
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "Bad request",
      message: "Registration unsuccessful",
      statusCode: 400,
    });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  const { email, password } = req.body;
  try {
    const verifyEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (
      !verifyEmail ||
      !(await bcrypt.compare(password, verifyEmail.password))
    ) {
      return res.status(403).json({
        field: "email or password",
        message: "Incorrect email or password",
      });
    }

    const tokenSecret = process.env.TOKEN_SECRET || "papa";

    const token = jwt.sign({ userId: verifyEmail.userId }, tokenSecret, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: token,
        user: {
          userId: verifyEmail.userId,
          firstName: verifyEmail.firstName,
          lastName: verifyEmail.lastName,
          email: verifyEmail.email,
          phone: verifyEmail.phone,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: "Bad request",
      message: "Authentication failed",
      statusCode: 401,
    });
  }
};

export const createOrganisation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  const { name, description } = req.body;
  try {
    const newOrganisation = await prisma.organization.create({
      data: {
        name,
        description,
        users: {
          connect: {
            userId: req.userId,
          },
        },
      },
      select: {
        orgId: true,
        name: true,
        description: true,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Organisation created successfully",
      data: newOrganisation,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

export const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  const { userId } = req.body;
  const { orgId } = req.params;
  try {
    const organisationVerify = await prisma.organization.findUnique({
      where: { orgId },
    });
    if (!organisationVerify)
      return res.status(400).json({ message: "Organisation not found" });
    await prisma.organization.update({
      where: { orgId },
      data: {
        users: {
          connect: {
            userId,
          },
        },
      },
    });
    return res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};
