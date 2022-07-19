import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { Attendance } from "./Attendance"
import { YearLevel } from "./YearLevel"

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

    @ManyToOne(() => YearLevel, (year_level) => year_level.year_id)
    @JoinColumn({ name: "year_id" })
    year_level: number

    @Column()
    address: string

    @Column()
    contact_number: string

    @Column({
        nullable: true
    })
    picture: string
}
