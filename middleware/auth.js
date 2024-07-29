import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = (req, res, next) => {
  try {
    // get the token
    const { authorization } = req.headers;
    if (!authorization) {
      return next(CustomErrorHandler.unAuthorize());
    }
    const token = authorization.split(" ")[1];

    //  verify the token
    const { _id, role } = JwtService.verify(token);
    req.user = {
      _id,
      role,
    };
    next()
  } catch (error) {
    next(CustomErrorHandler.unAuthorize());
  }
};
export default auth;
