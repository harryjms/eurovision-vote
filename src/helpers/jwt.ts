import { sign, verify } from "jsonwebtoken";
export interface JWTPayload {
  id: number;
  name: string;
}

export const generateToken = (payload: JWTPayload): string => {
  return sign(payload, process.env.JWT_SECRET);
};

export const decodeToken = (token: string): JWTPayload & { iat: number } => {
  return verify(token, process.env.JWT_SECRET) as JWTPayload & { iat: number };
};
