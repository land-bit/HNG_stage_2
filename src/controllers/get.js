import prisma from "../middlewares/prismaclientconfig.js";

export const getUsers = async (req, res) => {
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

export const getOneUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const userConnect = await prisma.user.findFirst({
      where: { userId: req.userId },
      include: { organisation: true },
    });

    const userSearch = await prisma.user.findFirst({
      where: { userId: id },
      include: { organisation: true },
    });

    if (!userSearch)
      return res.status(400).json({
        status: "Bad Request",
        message: "User not found",
      });

    if (
      !userConnect.organisation.some((el1) =>
        userSearch.organisation.some((el2) => el1.id === el2.id)
      )
    )
      return res.status(403).json({ message: "Unauthorized" });

    return res.status(200).json({
      status: "success",
      message: "<message>",
      data: {
        userId: userSearch.userId,
        firstName: userSearch.firstName,
        lastName: userSearch.lastName,
        email: userSearch.email,
        phone: userSearch.phone,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Bad request",
      message: "Request failed",
      statusCode: 500,
    });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    if (req.userId !== id)
      return res.status(403).json({ message: "Unauthorized" });

    const userId = await prisma.user.findFirst({
      where: { userId: id },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });
    if (!userId)
      return res.status(400).json({
        status: "Bad Request",
        message: "User not found",
      });
    return res.status(200).json({
      status: "success",
      message: "<message>",
      data: userId,
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
