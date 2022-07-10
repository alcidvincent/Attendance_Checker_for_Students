import { DataSource } from "typeorm";
import { Student } from "./entity/Student";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "studentregistration",
    synchronize: true,
    logging: true,
    entities: [Student],
    subscribers: [],
    migrations: [],
})