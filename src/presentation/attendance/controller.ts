import { Request, Response } from "express";
import { AttendanceRepository } from "../../domain/repositories/attendance.repository";
import { CreateAttendanceUseCase, GetAllAttendance } from '../../domain/uses-cases'
import { AttendanceDto, CustomError } from "../../domain";


export class AttendanceController {

    constructor(
        private repository: AttendanceRepository
    ) { }


    getAll = (req: Request, res: Response) => {
        new GetAllAttendance(this.repository).execute()
            .then(attendances => res.status(200).json(attendances))
            .catch(error => res.status(400).json(error))
    }

    createAttendance = (req: Request, res: Response) => {
        const [error, attendanceDto] = AttendanceDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new CreateAttendanceUseCase(this.repository)
            .execute(attendanceDto!)
            .then(attendance => res.status(200).json(attendance))
            .catch(error => {
                if (error instanceof CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                return res.status(500).json({ error: 'Ocurrió un error inesperado' });
            });
    }

}