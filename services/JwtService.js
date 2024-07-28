import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

class JwtService {
  static sign(payload, expire = "60s", secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expire });
  }
}

export default JwtService;