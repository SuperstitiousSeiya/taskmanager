import express from "express";
import { createTaskController, getAllTasksController, updateTaskController, deleteTaskController } from "../controllers/task.controllers";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();


router.post("/", authenticateToken, createTaskController);


router.get("/", authenticateToken, getAllTasksController);


router.put("/:taskId", authenticateToken, updateTaskController);


router.delete("/:taskId", authenticateToken, deleteTaskController);

export default router;
