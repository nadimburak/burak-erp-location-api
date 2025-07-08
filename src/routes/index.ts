import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express! Location Api is running.");
});

export default app;
