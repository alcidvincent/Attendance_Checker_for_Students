import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, getStudentById, patchStudentInfo, updateStudent } from "../controllers/studentsControllers";

const router = Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.patch('/', patchStudentInfo);
router.put('/', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
