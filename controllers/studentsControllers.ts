import { AppDataSource } from "../database/data-source";
import { Student } from "../database/entity/Student";
import { StudentData } from "../models/students";

export const getAllStudents = async (req, res) => {
    const studentRepository = AppDataSource.getRepository(Student);
    const students = await studentRepository.find();
    return res.status(200).send({ message: 'Request successful', data: students});
}

export const getStudentById = async (req, res) => {
    const params = req.params;
    const id = params.id;
    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOneBy({id: id});
    return res.status(200).send({ message: 'Request successful', data: student});
}

export const addStudent = async (req, res) => {
    const body: StudentData = req.body;
    const newStudent = new Student()
    newStudent.name = body.name
    newStudent.birthday = body.birthday
    newStudent.year_level = parseInt(body.year_level)
    newStudent.address = body.address
    newStudent.contact_number = body.contact_number
    const studentRepository = AppDataSource.getRepository(Student);
    await studentRepository.save(newStudent)
    return res.status(201).send({ message: 'Student successfully added', data: newStudent});
}

export const patchStudentInfo = async (req, res) => {
    const body = req.body;
    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOneBy({id: body.student_id});
    await studentRepository.update(student, body);
    return res.status(200).send({ message: 'Student Info successfully patched', data:{oldData: student, updated: body}});
}

export const updateStudent = async (req, res) => {
    const body = req.body;
    const studentRepository = AppDataSource.getRepository(Student);
    await studentRepository.save(body) 
    return res.status(200).send({ message: 'Student successfully updated', data: body});
}

export const deleteStudent = async (req, res) => {
    const params = req.params;
	const id = params.id;
    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOneBy({id: id});
    await studentRepository.remove(student);
    return res.status(200).send({ message: 'Student successfully deleted'});
}

export const exportStudents = async (req, res, next) => {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const studentRepository = AppDataSource.getRepository(Student);
    const students = await studentRepository.find();
    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
          {id: 'id', title: 'id'},
          {id: 'name', title: 'name'},
          {id: 'birthday', title: 'birthday'},
          {id: 'address', title: 'address'},
          {id: 'contact_number', title: 'contact_number'},
          {id: 'picture', title: 'picture'},
        ]
    });

    await csvWriter.writeRecords(students)
    return res.sendFile("out.csv", {root:global.ROOT_DIR}, (err) => {
        if (err) {
            next(err);
        } 
    });
}