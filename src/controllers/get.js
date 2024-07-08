import prisma from "../middlewares/prismaclientconfig.js";

export const getUser = async (req, res) => {
  try {
    const verifyEmail = await prisma.user.findMany();

    return res.status(200).json({
      status: "success",
      message: "Registration successful",
      data: verifyEmail,
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
