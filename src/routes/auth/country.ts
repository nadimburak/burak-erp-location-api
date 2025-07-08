import express from "express";
import {
  createCountry,
  deleteCountry,
  getAllCountry,
  getCountry,
  updateCountry,
} from "../../controllers/countryController";

const router = express.Router();

router.get("/countries", getAllCountry);
router.get("/countries/:id", getCountry);
router.post("/countries", createCountry);
router.put("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

export default router;
