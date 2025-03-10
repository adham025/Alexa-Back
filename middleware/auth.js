import jwt from "jsonwebtoken";
import userModel from "../DB/model/user.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
export const roles = {
  User: "User",
  Admin: "Admin",
};

export const auth = (acceptRoles = [roles.User, roles.Admin]) => {
  return asyncHandler(async (req, res, next) => {
    console.log("Received Headers:", req.headers);

    const { authorization } = req.headers;
    console.log("🔑 Authorization Header:", authorization);

    if (!authorization?.startsWith("Bearer__")) {
      return next(new Error("Invalid Bearer key", { cause: 400 }));
    }

    const token = authorization.split("Bearer__")[1]?.trim();

    try {
      const decoded = jwt.verify(token, process.env.tokenSignature);
      if (!decoded?.id || !decoded?.isLoggedIn) {
        return next(new Error("Invalid token payload", { cause: 400 }));
      }

      const user = await userModel
        .findById(decoded.id)
        .select("email userName role");
      if (!user) {
        return next(new Error("User not registered", { cause: 404 }));
      }

      if (acceptRoles.includes(user.role)) {
        req.user = user;
        next();
      } else {
        return next(new Error("Not authorized user", { cause: 403 }));
      }
    } catch (error) {
      console.error("JWT verification failed:", error);
      return next(new Error("Invalid or expired token", { cause: 400 }));
    }
  });
};
