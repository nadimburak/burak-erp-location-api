import express from "express";
import {
  getAllCountry,
  getCountry,
} from "../../controllers/countryController";

const router = express.Router();

router.get("/countries", getAllCountry);
router.get("/countries/:id", getCountry);

export default router;
