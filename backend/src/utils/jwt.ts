import jwt, {
  type Algorithm,
  type SignOptions,
  type Secret,
} from "jsonwebtoken";
import { env } from "../config/env";
import { JWT_CONFIG } from "../config/constants";

type JwtPayload = {
  sub: string;
  employee_id: string;
  role: number;
  permissions?: {
    access_boys_section: boolean;
    access_girls_section: boolean;
  };
};

export const signAccessToken = (payload: JwtPayload): string => {
  const secret: Secret = env.JWT_ACCESS_SECRET as Secret;
  const options = {
    algorithm: JWT_CONFIG.ALGORITHM as Algorithm,
    issuer: JWT_CONFIG.ISSUER,
    audience: JWT_CONFIG.AUDIENCE,
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign(payload as object, secret, options);
};
