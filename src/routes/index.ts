import express, { Request, Response } from "express";

import cityRoutes from "./api/city";
import countryRoutes from "./api/country";
import stateRoutes from "./api/state";

import cityAuthRoutes from "./auth/city";
import countryAuthRoutes from "./auth/country";
import stateAuthRoutes from "./auth/state";

import { authenticate } from "../middlewares/auth.middleware";

import { CitySeedDB } from "../seed/citySeeder";
import { CountrySeedDB } from "../seed/countrySeeder";
import { StateSeedDB } from "../seed/stateSeeder";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express! Location Api is running.");
});

app.get("/seed", async (req: Request, res: Response) => {
  try {
    await CountrySeedDB();
    // await StateSeedDB();
    // await CitySeedDB();
    res.status(200).json({
      message: "✅Country, State, City",
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Seeding failed", error: err });
  }
});

app.use("/api/", [countryRoutes, stateRoutes, cityRoutes]);

app.use(authenticate);

app.use("/auth/", [countryAuthRoutes, stateAuthRoutes, cityAuthRoutes]);

export default app;
