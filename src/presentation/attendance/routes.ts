import { Router } from "express";
import { AttendanceDatasourceImpl } from "../../infrastructure/datasource/attendance.datasource.impl";
import { AttendanceRepositoryImpl } from "../../infrastructure/repositories/attendance.repository.impl";
import { AttendanceController } from "./controller";


export class AttendanceRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new AttendanceDatasourceImpl();
        const repository = new AttendanceRepositoryImpl(datasource);
        const controller = new AttendanceController(repository);

        router.post('/create-attendance', controller.createAttendance)

        return router;

    }


}