import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select("-password -updatedAt -__v")
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      //  response
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
};
export default userController;
