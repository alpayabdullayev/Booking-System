import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, decodedToken) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return next(createError(403, "Token is not valid!"));
      }
  
      res.user = { userId: decodedToken.id, role: decodedToken.role,isAdmin: decodedToken.isAdmin };
      console.log("Verified middleware", res.user);
      next();
    });
  };

  export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if (res.user.userId === req.params.id || res.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (res.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };



export const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = res.user.role;

    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};
