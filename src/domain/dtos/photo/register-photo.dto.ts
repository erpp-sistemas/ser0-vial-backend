

export class RegisterPhotoDto {

    constructor(
        public custom_id: string,
        public place_id: number,
        public user_id: number,
        public photo_name: string,
        public type: string,
        public photo_url: string,
        public fecha: string
    ){}

    static create(object: { [key: string]: any }): [string?, RegisterPhotoDto?] {

        const { custom_id, place_id, user_id, photo_name, type, photo_url, fecha } = object;

        if(!custom_id) return ['Missing custom id'];
        if(!place_id) return ['Missing place_id'];
        if(!user_id) return ['Missing user id'];
        if(!photo_name) return ['Missing photo name'];
        if(!type) return ['Missing type'];
        if(!photo_url) return ['Missing photo url'];
        if(!fecha) return ['Missing fecha'];

        return [undefined, new RegisterPhotoDto(custom_id, place_id, user_id, photo_name, type, photo_url, fecha)]

    }

}