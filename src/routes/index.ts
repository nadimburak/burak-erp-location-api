import express, { Request, Response } from "express";

import cityRoutes from "./city";
import stateRoutes from "./state";
import countryRoutes from "./country";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express! Location Api is running.");
});

app.use(cityRoutes);
app.use(stateRoutes);
app.use(countryRoutes);

export default app;
