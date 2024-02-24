import jwt from "jsonwebtoken";

export const tokenVerify = (token) => {
    const decodedId = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedId;
  };
