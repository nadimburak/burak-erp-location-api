import express from "express";
import {
    getAllState,
    getState} from "../../controllers/stateController";

const router = express.Router();

router.get("/states", getAllState);
router.get("/states/:id", getState);


export default router;
