import { AttendanceDto } from "../dtos";
import { AttendanceEntity } from "../entities/attendance.entity";

export abstract class AttendanceRepository {

    abstract getAll(): Promise<AttendanceEntity[]>;
    abstract getByDates(date_init: string, date_end: string): Promise<AttendanceEntity[]>;
    abstract getByUserId(user_id: number): Promise<AttendanceEntity[]>;
    abstract create(attendanceDto: AttendanceDto): Promise<AttendanceEntity>

}