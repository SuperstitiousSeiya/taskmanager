import { Request, Response } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../models/tasks/task.model";
import {
  DataResponseInterface,
  TaskDataInterface,
  TaskTypes,
} from "../models/tasks/task.types";
import { generateResponseData, handleError } from "../utils/responseUtils";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";





export function createTaskController(req: AuthenticatedRequest, res: Response) {
  const newTask: TaskTypes = req.body;
  console.log(req.user)
  if(!newTask.task_name) return res.status(404).json(handleError("Input task name"))

  createTask(newTask, (taskId: number, error?: Error) => {
    if (error) return res.status(500).json(handleError(error.message));
    const response = generateResponseData(200, taskId, "Task created Successfully", false);
    return res.status(201).json(response);
  });
}

export function getAllTasksController(req: AuthenticatedRequest, res: Response) {
  getAllTasks((tasks: TaskTypes[], error?: Error) => {
    console.log(req.user)
    if (error) return res.status(500).json(handleError(error.message));

    const response = generateResponseData(200, tasks, "Tasks Fetched Successfully", false);
    return res.status(201).json(response);
  });
}


export function updateTaskController(req: Request, res: Response) {
  const taskId = parseInt(req.params.taskId);
  const updatedTask: TaskTypes = req.body;

  updateTask(taskId, updatedTask, (error?: Error) => {
    if (error) return res.status(500).json(handleError(error.message));
    const response = generateResponseData(201, [], "Updated the tasks successfully", false);
    return res.status(201).json(response);
  });
}

export function deleteTaskController(req: Request, res: Response) {
  const taskId = parseInt(req.params.taskId);

  deleteTask(taskId, (error?: Error) => {
    if (error) return res.status(404).json(handleError(error.message));
    const response = generateResponseData(201, [], "Deleted the tasks successfully", false);
    console.log(response)
    return res.status(201).json(response);
  });
}




