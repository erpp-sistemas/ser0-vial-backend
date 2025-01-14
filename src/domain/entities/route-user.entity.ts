

export class RouteUserEntity {

    constructor(
        public user_id: number,
        public latitude: number,
        public longitude: number,
        public created_at: string,
        public user?: any
    ){}

    static fromObject(object: { [key: string]: any }): RouteUserEntity {

        const { user_id, latitude, longitude, created_at, user } = object;

        return new RouteUserEntity(user_id, latitude, longitude, created_at, user)

    }

}