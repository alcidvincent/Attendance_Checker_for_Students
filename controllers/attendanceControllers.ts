import { AppDataSource } from "../database/data-source";
import { Attendance } from "../database/entity/Attendance";
import { AttendanceData } from "../models/attendance";

export const addAttendance = (req, res) =>{
    return res.status(200).send({ message: 'Attendance successfully added'});
}

export const getAllAttendance = (req, res) =>{
    return res.status(200).send({ message: 'Request successful'});
}

export const getStudentAttendance = (req, res) =>{
    return res.status(200).send({ message: 'Request successful'});
}

export const getTodayAttendance = (req, res) =>{
    return res.status(200).send({ message: 'Request successful'});
}