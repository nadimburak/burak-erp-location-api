import express from "express";
import {
  createCountry,
  deleteCountry,
  getAllCountry,
  getCountry,
  updateCountry,
} from "../controllers/countryController";

const router = express.Router();

router.post("/countries", createCountry);
router.get("/countries", getAllCountry);
router.get("/countries/:id", getCountry);
router.put("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

export default router;
