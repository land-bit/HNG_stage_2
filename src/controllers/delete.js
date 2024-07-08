import prisma from "../middlewares/prismaclientconfig.js";

export const deleteUser = async (req, res) => {
  const { ID } = req.query;
  try {
    const verifyEmail = await prisma.user.delete({
      where: {
        userId: ID,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Registration successful",
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
