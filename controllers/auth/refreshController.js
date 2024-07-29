import Joi from "joi";
import RefreshToken from "../../models/RefreshToken";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";
import { User } from "../../models";

const refreshController = {
  async refresh(req, res, next) {
    try {
      // HACK: validate refresh token
      const refreshSchema = Joi.object({
        refresh_token: Joi.string().required(),
      });
      const { error } = refreshSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      //  HACK: check refresh token is available in database
      const refreshToken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });
      if (!refreshToken) {
        return next(CustomErrorHandler.unAuthorize("Invalid refresh token"));
      }

      //   HACK: Verify refresh token
      const { _id } = JwtService.verify(refreshToken.token, REFRESH_SECRET);

      //   HACK: Check user in database
      const user = await User.findOne({ _id });
      if (!user) {
        return next(CustomErrorHandler.unAuthorize("No user found"));
      }

      // HACK: generate jwt token
      const access_token = JwtService.sign({
        _id: user._id,
        role: user.role,
      });

      // HACK: generate refresh token and whitlist in database
      const refresh_token = JwtService.sign(
        {
          _id: user._id,
          role: user.role,
        },
        "30d",
        REFRESH_SECRET
      );
      await RefreshToken.create({ token: refresh_token });

      // HACK: send response
      res.json({ access_token, refresh_token });
      
    } catch (error) {
      next(error);
    }
  },
};
export default refreshController;
