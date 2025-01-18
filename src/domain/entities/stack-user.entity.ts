

export class StackUserEntity {

    constructor(
        public user_id: number,
        public percentage: number,
        public created_at: string,
        public latitude: number,
        public longitude: number,
    ) { }

    static fromObject(object: any): StackUserEntity {

        let { user_id, percentage, created_at, latitude, longitude } = object;

        return new StackUserEntity(user_id, percentage, created_at, latitude, longitude);

    }

}