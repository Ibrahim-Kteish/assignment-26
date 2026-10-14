import express, { Request, Response, Router } from "express";

interface User {
  id: number;
  username: string;
  age: number;
}

export let users: User[] = [
  {
    id: 1,
    username: "Houssein",
    age: 29,
  },
  {
    id: 2,
    username: "Hachem",
    age: 22,
  },
  {
    id: 3,
    username: "Ali",
    age: 19,
  },
];

export const userRouter: Router = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(users);
});

userRouter.get("/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

userRouter.post("/", (req: Request, res: Response) => {
  const { id, username, age } = req.body;
  const newUser: User = { id, username, age };
  users.push(newUser);
  res.status(201).json({ message: "User added" });
});

userRouter.put("/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.age = req.body.age;
  res.status(204).send();
});

userRouter.delete("/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(users.indexOf(user), 1);
  res.status(204).send();
});
