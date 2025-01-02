import { prisma } from "../../data/sqlserver";
import { AttendanceDto, CustomError } from "../../domain";
import { AttendanceDatasource } from "../../domain/datasources/attendance.datasource";
import { AttendanceEntity } from "../../domain/entities/attendance.entity";


export class AttendanceDatasourceImpl extends AttendanceDatasource {

    async getAll(): Promise<AttendanceEntity[]> {
        try {
            const attendances = await prisma.attendance.findMany({
                include: {
                    user: true,
                    cat_status_attendance_attendance_status_departureTocat_status_attendance: true,
                    cat_status_attendance_attendance_status_entryTocat_status_attendance: true,
                }
            });
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
        let data_attendance: any = {};
        const attendance_exists = await this.getAttendanceById(user_id);

        if (type === 1) {
            if (attendance_exists) throw CustomError.conflict('Este usuario ya tiene un registro de entrada de hoy');
            data_attendance = await this.registerAttendanceEntry(user_id, time, latitude, longitude, photo);
            const status = await this.validateStatusEntry(user_id, time);
            this.updateStatusTimeEntry(data_attendance.attendance_id, status || 1)
        }

        if (type === 2) {
            if (!attendance_exists) throw CustomError.conflict('Este usuario no tiene un registro de entrada de hoy');
            if (attendance_exists.departure_time) throw CustomError.conflict('Este usuario ya tiene un registro de salida de hoy');
            data_attendance = await this.updateAttendanceDeparture(time, latitude, longitude, photo, attendance_exists.attendance_id);
            const status = await this.validateStatusDeparture(user_id, time);
            this.updateStatusTimeDeparture(attendance_exists.attendance_id, status || 2)

        }

        return AttendanceEntity.fromObject(data_attendance);
    }


    async validateStatusEntry(user_id: number, time: string) {
        const user_tolerance = await prisma.user.findFirst({
            where: { user_id: user_id },
            include: { schedule: true }
        })
        if (user_tolerance?.schedule?.tolerance) {
            const time_entry_tolerance = user_tolerance.schedule.tolerance.toISOString().split('T')[1].split('.')[0].substring(0, 5);
            const time_now = time.split('T')[1].split('.')[0].substring(0, 5);
            if (time_now > time_entry_tolerance) return 3;
            if (time_now <= time_entry_tolerance) return 1;
        }
    }

    async validateStatusDeparture(user_id: number, time: string) {
        const user_tolerance = await prisma.user.findFirst({
            where: { user_id: user_id },
            include: { schedule: true }
        });

        if (user_tolerance?.schedule?.departure_time) {
            const time_departure = user_tolerance.schedule.departure_time.toISOString().split('T')[1].split('.')[0].substring(0, 5);
            const time_now = time.split('T')[1].split('.')[0].substring(0, 5);
            if (time_now >= time_departure) return 2;
            if (time_now < time_departure) return 4;
        }
    }

    async getAttendanceById(user_id: number) {
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

    async registerAttendanceEntry(user_id: number, time: string, latitude: number, longitude: number, photo: string) {
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

    async updateAttendanceDeparture(time: string, latitude: number, longitude: number, photo: string, id: number) {
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

    async updateStatusTimeEntry(attendance_id: number, status: number) {
        const new_status = await prisma.attendance.update({
            where: { attendance_id: attendance_id },
            data: { status_entry: status }
        })
        return new_status;
    }

    async updateStatusTimeDeparture(attendance_id: number, status: number) {
        const new_status = await prisma.attendance.update({
            where: { attendance_id: attendance_id },
            data: { status_departure: status }
        })
        return new_status;
    }


}