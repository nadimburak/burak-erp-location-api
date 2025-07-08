import express from "express";
import {
    createState,
    deleteState,
    getAllState,
    getState,
    updateState
} from "../controllers/stateController";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/states", getAllState);
router.get("/states/:id", getState);

router.use(authenticate);

router.post("/states", createState);
router.put("/states/:id", updateState);
router.delete("/states/:id", deleteState);

export default router;
