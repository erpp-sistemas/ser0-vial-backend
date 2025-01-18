

export class InsertPercentageDto {

    constructor(
        public user_id: number,
        public percentage: number,
        public created_at: string,
        public latitude: number,
        public longitude: number,
    ){}

    static create(object: any):[string?, InsertPercentageDto?] {

        let { user_id, percentage, created_at, latitude, longitude } = object; 

        if(!user_id) return ['Missing user id'];
        if(!percentage) return ['Missing percentage'];

        if(!created_at) created_at = new Date().toISOString();
        if(!latitude) latitude = 0;
        if(!longitude) longitude = 0;

        return [undefined, new InsertPercentageDto(user_id, percentage, created_at, latitude, longitude)]

    }

}