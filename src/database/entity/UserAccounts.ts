import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserAccounts {
    @PrimaryGeneratedColumn() // PrimaryGeneratedColumn === AUTO_INCREMENT
    id: number

    @Column()
    username: string

    @Column()
    emailAddress: string

    @Column()
    password: string

    @Column({
        type: "datetime",
        default: () => 'CURRENT_TIMESTAMP'
    })
    accountCreated: string
}
