import { AppDataSource } from "../database/data-source";
import { Attendance } from "../database/entity/Attendance";
import { Student } from "../database/entity/Student";
import { AttendanceData } from "../models/attendance";

export const addAttendance = async (req, res) =>{
    const params = req.params; 
    const id = params.studentId;
    const attendanceRepository = AppDataSource.getRepository(Attendance);
    const student = await attendanceRepository.save({student: id});
    return res.status(201).send({ 
        message: 'Attendance successfully added', 
        data: {
            id,
            attendance_date: student.attendance_date
        }
    });
}

export const getAllAttendance = async (req, res) =>{
    const attendanceRepository = AppDataSource.getRepository(Attendance);
    const attendances = await attendanceRepository
    .createQueryBuilder("attendance")
    .innerJoinAndSelect("attendance.student", "student_id")
    .getMany()
    return res.status(200).send({ message: 'Request successful', data: attendances});
}

export const getStudentAttendance = async (req, res) =>{
    const params = req.params;
    const id = params.studentId;
    const attendanceRepository = AppDataSource.getRepository(Attendance);
    const attendances = await attendanceRepository
    .createQueryBuilder("attendance")
    .innerJoinAndSelect("attendance.student", "student_id")
    .where("attendance.student = :studentId")
    .setParameters({ studentId: id })
    .getMany()
    return res.status(200).send({ message: 'Request successful', data: attendances});
}

export const getTodayAttendance = async (req, res) =>{
    const params = req.params;
    const date = params.date;
    const attendanceRepository = AppDataSource.getRepository(Attendance);
    const attendances = await attendanceRepository
    .createQueryBuilder("attendance")
    .innerJoinAndSelect("attendance.student", "student_id")
    .where("DATE_FORMAT(attendance.attendance_date, '%Y-%m-%d') = :date")
    .setParameters({ date: date })
    .orderBy("attendance.id", "ASC")
    .getMany()
    return res.status(200).send({ message: 'Request successful', data: attendances});
}