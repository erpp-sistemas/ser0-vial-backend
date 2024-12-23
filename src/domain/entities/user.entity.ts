

export class UserEntity {

    constructor(
        public user_id: number,
        public first_name: string,
        public middle_name: string,
        public paternal_surname: string,
        public maternal_surname: string,
        public birthdate: string,
        public photo_url: string,
        public entry_date: string,
        public low_date: string,
        public active: number,
        public access_web: number,
        public access_movil: number,
        public role: any,
        public theme_color: string,
        public place_user: any[]
    ){}

    static fromObject( object: {[key: string]: any} ): UserEntity {
        const { user_id, first_name, middle_name, paternal_surname, maternal_surname, birthdate, photo_url, entry_date, low_date, active, access_web, access_movil, role, theme_color, place_user } = object;
        return new UserEntity(user_id, first_name, middle_name, paternal_surname, maternal_surname, birthdate, photo_url, entry_date, low_date, active, access_web, access_movil, role, theme_color, place_user)

    }

}