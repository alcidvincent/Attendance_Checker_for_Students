import { Router } from "express";
import { addYearLevel, getYearLevels } from "../controllers/yearLevelControllers";
import authorizationMiddleware from "../middlewares/authorizationMiddleware";

const router = Router();

router.use(authorizationMiddleware);

router.post("/", addYearLevel);
router.get("/", getYearLevels);

export default router;