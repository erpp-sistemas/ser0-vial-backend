import { AttendanceDto } from "../../dtos";
import { AttendanceEntity } from "../../entities/attendance.entity";
import { AttendanceRepository } from "../../repositories/attendance.repository";



interface CreateAttendance {
    execute(dto: AttendanceDto): Promise<AttendanceEntity>
}


export class CreateAttendanceUseCase implements CreateAttendance {
    
    constructor(
        private repository: AttendanceRepository
    ){}
    
    execute(dto: AttendanceDto): Promise<AttendanceEntity> {
        return this.repository.create(dto);
    }

}