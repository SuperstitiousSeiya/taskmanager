import express, {Request, Response} from 'express';
import { AuthenticatedRequest, User, generateAccessToken, refreshTokens } from '../middlewares/authMiddleware';
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const posts = [
    {
      username: "Kyle",
      title: "Post 1",
    },
    {
      username: "Jim",
      title: "Post 2",
    },
  ];


export function loginAccount(req: Request, res: Response){
    const username: string = req.body.username;
    const user: User = {name: username}
    if(!user) return
    const accessToken: string = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "", {expiresIn :"120s"});
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
}

export function signUpAccount(req: Request, res: Response){
  res.json({signup: true})
}

export function getToken(req: AuthenticatedRequest, res: Response){
  const refreshToken = req.body.token

  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "", (err: any, user: any) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken(user)
    res.json({ accessToken: accessToken })
  })
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "");
}