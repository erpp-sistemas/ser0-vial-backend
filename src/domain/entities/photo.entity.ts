

export class PhotoEntity {

    constructor(
        public custom_id: string,
        public place_id: number,
        public user_id: number,
        public photo_name: string,
        public type: string,
        public photo_url: string,
        public fecha: string
    ){}

    static fromObject(object: { [key: string]: any }): PhotoEntity {

        const { custom_id, place_id, user_id, photo_name, type, photo_url, fecha } = object;

        return new PhotoEntity(custom_id, place_id, user_id, photo_name, type, photo_url, fecha)

    }

}