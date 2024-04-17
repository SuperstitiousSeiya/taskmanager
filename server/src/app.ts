import express, { Application } from "express";

import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import postRoutes from './routes/post.routes'
import connection from "./config/sqlconfig";

const app: Application = express();
const port: number = 4000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/posts", postRoutes);
connection
  .getConnection()
  .then(() => {
    console.log("Connected to MySQL database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });
