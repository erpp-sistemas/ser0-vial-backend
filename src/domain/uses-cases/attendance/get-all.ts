import { AttendanceDto } from "../../dtos";
import { AttendanceEntity } from "../../entities/attendance.entity";
import { AttendanceRepository } from "../../repositories/attendance.repository";



interface GetAllAttendanceUseCase {
    execute(): Promise<AttendanceEntity[]>
}


export class GetAllAttendance implements GetAllAttendanceUseCase {
    
    constructor(
        private repository: AttendanceRepository
    ){}
    
    execute(): Promise<AttendanceEntity[]> {
        return this.repository.getAll();
    }

}