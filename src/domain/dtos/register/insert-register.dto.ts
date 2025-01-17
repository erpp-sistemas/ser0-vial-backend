

export class InsertRegisterDto {

    constructor(
        public place_id: number,
        public data_json: string,
        public registration_date: string,
        public form_id: number,
        public latitude: number,
        public longitude: number,
        public user_id: number,
        public custom_id: string
    ){}


    static create( obj: { [key: string]: any } ): [string?, InsertRegisterDto?] {

        let { place_id, data_json, registration_date, form_id, latitude, longitude, user_id, custom_id } = obj;

        if(!place_id) return ['Missing place id']
        if(!data_json) return ['Missing data json']
        if(!registration_date) return ['Missing registration date']
        if(!form_id) return ['Missing form id']
        if(!user_id) return ['Missing user id']
        if(!custom_id) return ['Missing custom id']

        if(!latitude) latitude = 0;
        if(!longitude) longitude = 0;

        return [undefined, new InsertRegisterDto(place_id, data_json, registration_date, form_id, latitude, longitude, user_id, custom_id)]

    }

}