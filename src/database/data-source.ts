import { DataSource } from "typeorm";
import { Attendance } from "./entity/Attendance";
import { Student } from "./entity/Student";
import { YearLevel } from "./entity/YearLevel";
import { UserAccounts } from "./entity/UserAccounts";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [Student, Attendance, YearLevel, UserAccounts],
    subscribers: [],
    migrations: [],
})