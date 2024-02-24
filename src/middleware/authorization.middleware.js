

export const authorizationUser = (requiredRoles) => {
  return async (req, res, next) => {
    const role = req.role;

    if (requiredRoles.includes(role)) {
      next();
    } else {
      return res.status(403).json({ message: "you are not authorized Person" });
    }
  };
};
