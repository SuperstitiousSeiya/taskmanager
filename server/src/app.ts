import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

import {
  AuthenticatedRequest,
  User,
  authenticateToken,
  generateAccessToken,
  refreshTokens,
} from "./middlewares/authMiddleware";

const app: Application = express();
const port: number = 4000;


app.use(express.json())



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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Worasdsadld!");

});

type UserProps = {
  name: string;
};

app.post("/login", (req: Request, res: Response) => {
  const username: string = req.body.username;
  const user: User = {name: username}
  if(!user) return
  const accessToken: string = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "");
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});


app.post("/token", (req: AuthenticatedRequest, res: Response) => {
  const refreshToken: string | undefined = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  // Define the callback function separately with the correct signature
  const verifyCallback = (
    err: VerifyErrors | null,
    user: JwtPayload | undefined
  ) => {
    if (err) return res.sendStatus(403);
    if (!user || typeof user !== "object" || !("name" in user))
      return res.sendStatus(403);

    const accessToken: string = generateAccessToken(user.name);
    res.json({ accessToken });
  };

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "");
});


app.get('/posts', authenticateToken, (req: AuthenticatedRequest, res) => {
  console.log(req.user)
  res.json(posts.filter(post => post.username === req.user?.name))
})




mongoose
  .connect("mongodb://localhost:27017/taskmanager")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
