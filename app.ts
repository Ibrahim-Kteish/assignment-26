import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { generalRouter } from "./routes/general_routes";
import { userRouter } from "./routes/user_routes";
import { todoRouter } from "./routes/todo_routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/generals", generalRouter);
app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
