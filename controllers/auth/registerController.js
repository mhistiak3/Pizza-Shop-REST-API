// dependencies
import Joi from "joi";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";
import JwtService from "../../services/JwtService";

// register a new user
const registerController = {
  async register(req, res, next) {
    // HACK: validate the request
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Za-z0-9]{4,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      // HACK: check if user is in the database already
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }

      // HACK: prepare model
      const { name, email, password } = req.body;
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // HACK: store in database;
      const result = await user.save();
      // HACK: generate jwt token
      const access_token = JwtService.sign({
        _id: result._id,
        role: result.role,
      });

      // HACK: send response
      res.json({ access_token, message: "Registration success" });
    } catch (error) {
      next(error);
    }
  },
};

export default registerController;
