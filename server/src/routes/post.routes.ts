import express from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middlewares/authMiddleware';


const router = express.Router();

let posts = [
    {
        username: "Jim",
        post: "hi po"
    }
]

router.get('/', authenticateToken, (req: AuthenticatedRequest, res) => {
    res.json(posts.filter(post => post.username === req.user?.name))
  })
  

export default router;