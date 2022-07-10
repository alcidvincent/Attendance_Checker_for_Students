import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Student {
    [x: string]: any
    @PrimaryGeneratedColumn() // PrimaryGeneratedColumn === AUTO_INCREMENT
    student_id: number

    @Column()
    name: string

    @Column()
    birthday: string

    @Column()
    address: string

    @Column()
    contact_number: number
}
