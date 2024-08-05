import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await UserModel.findOne({
      phone: isVerified.phone,
    }).select({
      password: 0,
    });

    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
