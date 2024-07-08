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
    const id = req.userId;

    const userId = await prisma.user.findUnique({
      where: { userId: id },
      include: { organisation: true },
    });
    return res.status(200).json({
      status: "success",
      message: "<message>",
      data: { organisations: userId.organisation },
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

export const getOneOrganisation = async (req, res) => {
  const { id } = req.params;
  try {
    const organisation = await prisma.organization.findUnique({
      where: { orgId: id },
    });

    if (!organisation)
      return res.status(400).json({
        status: "Bad Request",
        message: "Organisation not found",
      });

    return res.status(200).json({
      status: "success",
      message: "<message>",
      data: organisation,
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
