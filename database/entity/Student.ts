import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Attendance } from "./Attendance"

@Entity()
export class Student {
    [x: string]: any
    @PrimaryGeneratedColumn() // PrimaryGeneratedColumn === AUTO_INCREMENT
    id: number

    @Column()
    name: string

    @Column({
        type: "date"
    })
    birthday: string

    @Column()
    year_level: number

    @Column()
    address: string

    @Column()
    contact_number: string
}
