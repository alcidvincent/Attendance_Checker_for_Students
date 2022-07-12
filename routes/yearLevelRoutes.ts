import { Router } from "express";
import { addYearLevel, getYearLevels } from "../controllers/yearLevelControllers";

const router = Router();

router.post("/", addYearLevel);
router.get("/", getYearLevels);

export default router;