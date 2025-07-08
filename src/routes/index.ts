import express, { Request, Response } from "express";

import cityRoutes from "./api/city";
import stateRoutes from "./api/state";
import countryRoutes from "./api/country";

import cityAuthRoutes from "./auth/city";
import stateAuthRoutes from "./auth/state";
import countryAuthRoutes from "./auth/country";

import { authenticate } from "../middlewares/auth.middleware";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express! Location Api is running.");
});

app.use('/api/', [countryRoutes, stateRoutes, cityRoutes]);

app.use(authenticate);

app.use('/auth/', [countryAuthRoutes, stateAuthRoutes, cityAuthRoutes]);

export default app;
