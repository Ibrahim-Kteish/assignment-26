import express, { Request, Response, Router } from "express";
import path from "path";

export const generalRouter: Router = express.Router();

generalRouter.get("/", (req: Request, res: Response) => {
  res.send("Hi from nodejs");
});

generalRouter.get("/json", (req: Request, res: Response) => {
  res.json({ message: "Hi from nodejs" });
});

generalRouter.get("/read_parms_data/:id/:username", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const username: string = req.params.username as string;
  res.json({ id_sent: id, username_sent: username });
});

generalRouter.get("/read_query_data", (req: Request, res: Response) => {
  const id: number = Number(req.query.id);
  const username: string = req.query.username as string;
  res.json({ id_sent: id, username_sent: username });
});

generalRouter.get("/custom_status_code", (req: Request, res: Response) => {
  res.status(201).json({ message: "Hi from nodejs" });
});

generalRouter.get("/html_file", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "html.html"));
});
