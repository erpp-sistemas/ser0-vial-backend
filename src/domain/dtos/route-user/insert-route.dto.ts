

export class InsertRouteUserDto {

    constructor(
        public user_id: number,
        public latitude: number,
        public longitude: number,
        public created_at: string
    ){}

    static create(object : any): [string?, InsertRouteUserDto?] {

        const { user_id, latitude, longitude, created_at } = object;

        if(!user_id) return ['Missing user id'];
        if(!latitude) return ['Missing latitude'];
        if(!longitude) return ['Missing longitude'];

        return [undefined, new InsertRouteUserDto(user_id, latitude, longitude, created_at)]

    }

}