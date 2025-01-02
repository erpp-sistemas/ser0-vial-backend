

export class AttendanceDto {

    constructor(
        public type: number,
        public user_id: number,
        public time: string,
        public latitude: number,
        public longitude: number,
        public photo: string
    ){}

    static create( object: { [key: string]: any } ): [string?, AttendanceDto?] {

        const { type, user_id, time, latitude, longitude, photo } = object;

        if(!type) return ['Missing type'];
        if(!user_id) return ['Missing user id'];
        if(!time) return ['Missing entry time'];
        if(!latitude) return ['Missing latitude entry time'];
        if(!longitude) return ['Missing longitude entry time'];

        return [undefined, new AttendanceDto(type, user_id, time, latitude, longitude, photo)]

    }

}