import { AttendanceDto } from "../../domain";
import { AttendanceDatasource } from "../../domain/datasources/attendance.datasource";
import { AttendanceEntity } from "../../domain/entities/attendance.entity";
import { AttendanceRepository } from "../../domain/repositories/attendance.repository";


export class AttendanceRepositoryImpl extends AttendanceRepository {
    
    constructor(
        private datasource: AttendanceDatasource
    ){ super(); }
    
    getAll(): Promise<AttendanceEntity[]> {
        return this.datasource.getAll();
    }
    getByDates(date_init: string, date_end: string): Promise<AttendanceEntity[]> {
        return this.datasource.getByDates(date_init, date_end);
    }
    getByUserId(user_id: number): Promise<AttendanceEntity[]> {
        return this.datasource.getByUserId(user_id);
    }
    create(attendanceDto: AttendanceDto): Promise<AttendanceEntity> {
        return this.datasource.create(attendanceDto);
    }

}