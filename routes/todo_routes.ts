import express, { Request, Response, Router } from "express";
import { users } from "./user_routes";

interface Todo {
  id: number;
  task: string;
  user_id: number;
}

let todos: Todo[] = [
  {
    id: 1,
    task: "todo1",
    user_id: 1,
  },
  {
    id: 2,
    task: "todo2",
    user_id: 2,
  },
  {
    id: 3,
    task: "todo3",
    user_id: 2,
  },
];

export const todoRouter: Router = express.Router();

todoRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(todos);
});

todoRouter.get("/user/:user_id", (req: Request, res: Response) => {
  const user_id: number = Number(req.params.user_id);
  const userTodos = todos.filter((todo) => todo.user_id === user_id);
  res.status(200).json(userTodos);
});

todoRouter.get("/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.status(200).json(todo);
});

todoRouter.post("/", (req: Request, res: Response) => {
  const { id, task, user_id } = req.body;
  const user = users.find((user) => user.id === user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found, todo not added" });
  }
  const newTodo: Todo = { id, task, user_id };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

todoRouter.put("/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.task = req.body.task;
  res.status(204).send();
});

todoRouter.delete("/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

export { users };
