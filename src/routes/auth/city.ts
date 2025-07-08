import express from "express";
import {
  createCity,
  deleteCity,
  getAllCity,
  getCity,
  updateCity,
} from "../../controllers/cityController";

const router = express.Router();

router.get("/cities", getAllCity);
router.get("/cities/:id", getCity);
router.post("/cities", createCity);
router.put("/cities/:id", updateCity);
router.delete("/cities/:id", deleteCity);

export default router;
