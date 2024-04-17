import express from "express";
import { getToken, loginAccount, signUpAccount } from "../controllers/auth.controller";

const router = express.Router();


router.post("/login", loginAccount)

router.post('/signup', signUpAccount)

router.post('/refreshtoken', getToken)

export default router;