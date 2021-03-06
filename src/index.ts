require('dotenv').config()

import { Application, Request, Response } from "express";
import { AppDataSource } from "./database/data-source";
import studentsRoutes from "./routes/studentsRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import yearLevelRoutes from "./routes/yearLevelRoutes";
import userAccountsRoutes from "./routes/userAccountsRoutes"
import { exportStudents } from "./controllers/studentsControllers";
import authorizationMiddleware from "./middlewares/authorizationMiddleware";

const express = require('express')
const app: Application = express();
const host = '0.0.0.0';
const port = 8080;

const path = require('path');
global.ROOT_DIR = path.dirname(path.join(__dirname, "Node.js"))

AppDataSource.initialize()
.then(() => {})
.catch((error) => console.log(error))

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req, res): Promise<Response> => {
        return res.status(200).send({
            message: "Attendance Checker for Students",
        });
    }
);

app.use("/students", studentsRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/yearLevel", yearLevelRoutes);
app.use("/users", userAccountsRoutes);

app.use(authorizationMiddleware)
app.get("/exportStudents", exportStudents)

try {
    app.listen(port, host, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}