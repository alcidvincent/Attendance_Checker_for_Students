import { DataSource } from "typeorm";
import { Attendance } from "./entity/Attendance";
import { Student } from "./entity/Student";
import { YearLevel } from "./entity/YearLevel";
import { UserAccounts } from "./entity/UserAccounts";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "studentregistration",
    synchronize: true,
    logging: false,
    entities: [Student, Attendance, YearLevel, UserAccounts],
    subscribers: [],
    migrations: [],
})