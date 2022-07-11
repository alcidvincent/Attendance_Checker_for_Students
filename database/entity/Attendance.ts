import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Student } from "./Student"

@Entity()
export class Attendance {
    [x: string]: any
    @PrimaryGeneratedColumn() // PrimaryGeneratedColumn === AUTO_INCREMENT
    id: number

    @ManyToOne(() => Student, (student) => student.student_id)
    @JoinColumn({ name: "student_id" })
    student: Student

    @Column({
        type: "datetime"
    })
    attendance_date: string
}