import connection from "../../config/sqlconfig";
import { TaskTypes } from "./task.types";

// Create a new task
async function createTask(
  newTask: TaskTypes,
  callback: (taskId: number, error?: any) => void
): Promise<any> {
  try {
    const currentTimestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
    const [result]  = await connection.query("INSERT INTO tasks SET ?", [{
      ...newTask, created_at: currentTimestamp}
    ]);
    if (!result) return;

    if ("insertId" in result) {
      const taskId = result.insertId;
      callback(taskId);
    } else {
      const error = new Error("Failed to insert task");
      callback(-1, error);
    }
  } catch (error) {
    console.error("Error creating task:", error);
    callback(-1, error);
  }
}



// Retrieve all tasks
async function getAllTasks(
  callback: (tasks: TaskTypes[], error?: any) => void
): Promise<void> {
  try {
    const [rows] = await connection.query("SELECT * FROM tasks");
    const tasks = rows as TaskTypes[];
    callback(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    callback([], error);
  }
}



// Update an existing task
async function updateTask(
  taskId: number,
  updatedTask: TaskTypes,
  callback: (error?: any) => void
): Promise<void> {
  try {
    const [result] = await connection.query(
      "UPDATE tasks SET ? WHERE task_id = ?",
      [updatedTask, taskId]
    );

    if ((Array.isArray(result) ? result.length : result?.affectedRows) > 0) {
      callback();
    } else {
      const error = new Error("Task not found or could not be updated");
      console.error(error.message);
      callback(error);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    callback(error);
  }
}



// Delete a task
async function deleteTask(
  taskId: number,
  callback: (error?: any) => void
): Promise<void> {
  try {
    const [result] = await connection.query(
      `DELETE from tasks where task_id = ?`,
      [taskId]
    );
    if ((Array.isArray(result) ? result.length : result?.affectedRows) > 0) {
      callback();
    } else {
      const error = new Error("Task not found or could not be deleted");
      console.error(error.message);
      callback(error);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    callback(error);
  }
}

export { createTask, getAllTasks, updateTask, deleteTask };
