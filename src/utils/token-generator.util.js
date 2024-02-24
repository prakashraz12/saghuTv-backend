import jwt from "jsonwebtoken";

export const tokenGenrerator = (id, role) => {
  const token = jwt.sign(
    { id: id, role: role },
    process.env.TOKEN_SECRET,
    { expiresIn: "30d" } // Set expiration time to 30 days
  );
  return token;
};