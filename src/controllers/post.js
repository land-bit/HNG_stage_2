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
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });

    const tokenSecret = process.env.TOKEN_SECRET;

    const token = jwt.sign({ userId: newUser.userId }, tokenSecret, {
      expiresIn: "24h",
    });
    res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: token,
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "Bad request",
      message: "Registration unsuccessful",
      statusCode: 400,
    });
  }
};
