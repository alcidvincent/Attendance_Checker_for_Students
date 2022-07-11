import { Router } from "express";
import { addAttendance, getAllAttendance, getStudentAttendance, getTodayAttendance,  } from "../controllers/attendanceControllers";

const router = Router();

router.post("/:studentId", addAttendance);
router.get("/", getAllAttendance);
router.get("/:studentId", getStudentAttendance);
router.get("/today/:date", getTodayAttendance);

export default router;