import express from "express";
import {
  getAllCity,
  getCity,
} from "../../controllers/cityController";

const router = express.Router();

router.get("/cities", getAllCity);
router.get("/cities/:id", getCity);

export default router;
