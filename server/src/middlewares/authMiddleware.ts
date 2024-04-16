import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export let refreshTokens: string[] = [];

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  const token = authHeader as string;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user as JwtPayload;
    next();
  });
}

export type User = {
  name: string;
};

export function generateAccessToken(user: User) {
  return jwt.sign({ name: user}, process.env.ACCESS_TOKEN_SECRET || "rr", {
    expiresIn: "60s",
  });
}
