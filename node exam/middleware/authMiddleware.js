import jwt from "jsonwebtoken";

// ✅ Middleware to verify JWT
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // store user data in request
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

// ✅ Middleware for role-based access (optional)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permission" });
    }
    next();
  };
};
