import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";

const loginController = {
  async login(req, res, next) {
    // HACK: Validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Za-z0-9]{4,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      const { email, password } = req.body;
      // HACK: check if user is in the database or not
      const user = await User.findOne({ email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredential());
      }

      // HACK: Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(CustomErrorHandler.wrongCredential());
      }

      // HACK: generate jwt token
      const access_token = JwtService.sign({
        _id: user._id,
        role: user.role,
      });

      // HACK: send response
      res.json({ access_token, message: "Login success" });

    } catch (error) {
      next(error);
    }
  },
};
export default loginController;