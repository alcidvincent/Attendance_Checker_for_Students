import { AppDataSource } from "../database/data-source";
import { Student } from "../database/entity/Student";
import { StudentData } from "../models/students";
import formidable from 'formidable';
import FormData from "form-data";
import axios from "axios";
import fs from "fs";

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

export const addStudent = async (req, res, next) => {
    const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            const newStudent = new Student()
            newStudent.name = fields.name
            newStudent.birthday = fields.birthday
            newStudent.year_level = +fields.year_level
            newStudent.address = fields.address
            newStudent.contact_number = fields.contact_number
            // save image to cloudinary
            try {
                const form = new FormData();
                form.append('file', fs.createReadStream(files.picture.filepath))
                form.append('upload_preset', 'upreset')
                form.append('public_id', files.picture.newFilename)
                form.append('api_key', process.env.CLOUDINARY_API_KEY)
                const response: any = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, 
                    form, 
                    {
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                )

                newStudent.picture = response.data.url
                const studentRepository = AppDataSource.getRepository(Student);
                await studentRepository.save(newStudent)
                return res.status(201).send({ message: 'Student successfully added', data: newStudent});
            } catch (error) {
                return res.status(500).send({ message: "Error Encountered", error })   
            }
        });
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
