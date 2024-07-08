import jwt from "jsonwebtoken";

export const token = (req, res, next) => {
  try {
    const tokenCode = req.headers.authorization.split(" ")[1];
    if (!tokenCode)
      return res.status(401).json({ message: "No token provided" });
    const user = jwt.verify(tokenCode, process.env.TOKEN_SECRET || "papa");
    req.userId = user.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
