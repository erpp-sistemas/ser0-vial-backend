

export class InsertRegisterDto {

    constructor(
        public place_id: number,
        public data_json: string,
        public registration_date: string,
        public form_id: number,
        public latitude: number,
        public longitude: number,
        public user_id: number,
    ){}


    static create( obj: { [key: string]: any } ): [string?, InsertRegisterDto?] {

        const { place_id, data_json, registration_date, form_id, latitude, longitude, user_id } = obj;

        if(!place_id) return ['Missing place id']
        if(!data_json) return ['Missing data json']
        if(!registration_date) return ['Missing registration date']
        if(!form_id) return ['Missing form id']
        if(!latitude) return ['Missing latitude']
        if(!longitude) return ['Missing longitude']
        if(!user_id) return ['Missing user id']


        return [undefined, new InsertRegisterDto(place_id, data_json, registration_date, form_id, latitude, longitude, user_id)]

    }

}