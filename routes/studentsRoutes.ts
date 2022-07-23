import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, getStudentById, patchStudentInfo, updateStudent } from "../controllers/studentsControllers";
import authorizationMiddleware from "../middlewares/authorizationMiddleware";

const router = Router();

router.use(authorizationMiddleware)

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.patch('/', patchStudentInfo);
router.put('/', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
