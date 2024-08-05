export const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res.status(403).send({
        success: false,
        message: "Access denied, UnAuthorized Access.",
      });
    }
    next(); // if user is admin
  } catch (error) {
    next(error);
  }
};
