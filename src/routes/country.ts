import express from "express";
import {
  createCountry,
  deleteCountry,
  getAllCountry,
  getCountry,
  updateCountry,
} from "../controllers/countryController";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/countries", getAllCountry);
router.get("/countries/:id", getCountry);

router.use(authenticate);

router.post("/countries", createCountry);
router.put("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

export default router;
