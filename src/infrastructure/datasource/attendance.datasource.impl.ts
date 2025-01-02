import { prisma } from "../../data/sqlserver";
import { AttendanceDto, CustomError } from "../../domain";
import { AttendanceDatasource } from "../../domain/datasources/attendance.datasource";
import { AttendanceEntity } from "../../domain/entities/attendance.entity";


export class AttendanceDatasourceImpl extends AttendanceDatasource {

    async getAll(): Promise<AttendanceEntity[]> {
        try {
            const attendances = await prisma.attendance.findMany();
            return attendances.map(attendance => AttendanceEntity.fromObject(attendance))
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }

    getByDates(date_init: string, date_end: string): Promise<AttendanceEntity[]> {
        throw new Error("Method not implemented.");
    }

    getByUserId(user_id: number): Promise<AttendanceEntity[]> {
        throw new Error("Method not implemented.");
    }

    async create(attendanceDto: AttendanceDto): Promise<AttendanceEntity> {
        const { type, user_id, time, latitude, longitude, photo } = attendanceDto;
        let data_atendance: any = {};
        const attendance = await this.getRegisterById(user_id);

        if (type === 1) {
            if (attendance) throw CustomError.conflict('Este usuario ya tiene un registro de entrada de hoy');
            data_atendance = await this.registerAttendance(user_id, time, latitude, longitude, photo);
        }

        if (type === 2) {
            if (!attendance) throw CustomError.conflict('Este usuario no tiene un registro de entrada de hoy');
            if (attendance.departure_time) throw CustomError.conflict('Este usuario ya tiene un registro de salida de hoy');
            data_atendance = await this.updateAttendance(time, latitude, longitude, photo, attendance.attendance_id);
        }

        return AttendanceEntity.fromObject(data_atendance);
    }


    async getRegisterById(user_id: number) {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const attendance = await prisma.attendance.findFirst({
            where: {
                user_id: user_id,
                entry_time: {
                    gte: startOfDay, // Mayor o igual al inicio del día
                    lt: endOfDay,    // Menor al inicio del siguiente día
                },
            },
        });
        return attendance;
    }

    async registerAttendance(user_id: number, time: string, latitude: number, longitude: number, photo: string) {
        const data_atendance = await prisma.attendance.create({
            data: {
                user_id: user_id,
                entry_time: time,
                latitude_entry_time: latitude,
                longitude_entry_time: longitude,
                photo_entry_time: photo
            }
        });
        return data_atendance;
    }

    async updateAttendance(time: string, latitude: number, longitude: number, photo: string, id: number) {
        const data_atendance = await prisma.attendance.update({
            where: { attendance_id: id },
            data: {
                departure_time: time,
                latitude_departure_time: latitude,
                longitude_departure_time: longitude,
                photo_departure_time: photo
            }
        })
        return data_atendance
    }


}