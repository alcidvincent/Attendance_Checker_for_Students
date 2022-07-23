import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from "typeorm"

@Entity()
export class YearLevel {
    @PrimaryColumn()
    year_id: number

    @Column()
    year_name: string

    @Column({
        nullable: true,
    })
    year_description: string
}