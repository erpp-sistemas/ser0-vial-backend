

export class AttendanceEntity {

    constructor(
        public attendance_id: number,
        public user_id: number,
        public entry_time: string,
        public latitude_entry_time: number,
        public longitude_entry_time: number,
        public photo_entry_time: string,
        public departure_time: string,
        public latitude_departure_time: number,
        public longitude_departure_time: number,
        public photo_departure_time: string
    ){}


    static fromObject( object: { [key: string]: any } ): AttendanceEntity {

        const { attendance_id, user_id, entry_time, latitude_entry_time, longitude_entry_time, photo_entry_time, departure_time, latitude_departure_time, longitude_departure_time, photo_departure_time } = object;

        return new AttendanceEntity(attendance_id, user_id, entry_time, latitude_entry_time, longitude_entry_time, photo_entry_time, departure_time, latitude_departure_time, longitude_departure_time, photo_departure_time)

    }

}