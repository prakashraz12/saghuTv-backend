import { ApiError } from "../utils/ApiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { tokenVerify } from "../utils/token-verify.js";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // Check if the token is not in the header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({meessage:"Please provide token"});
    }

    const token = authHeader.split(" ")[1];
    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const decodedToken = await tokenVerify(token);

    if (decodedToken.id) {
      //
      req.user = decodedToken.id;
      req.role = decodedToken.role;
      next();
    } else {
      return res.status(403).json({ message: "Not Authorized Person" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
