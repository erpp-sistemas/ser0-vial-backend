


export class CreateUserDto {

    constructor(
        public username: string,
        public password: string,
        public first_name: string,
        public paternal_surname: string,
        public maternal_surname: string,
        public birthdate: string,
        public photo_url: string,
        public access_web: number,
        public access_movil: number,
        public role_id: number,
        public entry_date: string,
        public theme_color: string,
        public middle_name?: string,
    ) {}

    static create( object: { [key: string]: any } ): [string?, CreateUserDto?] {
        
        const { username, password, first_name, middle_name, paternal_surname, maternal_surname, birthdate, photo_url, access_web, access_movil, role_id, theme_color } = object;
        
        if(!username) return ['Missing username'];
        if(!password) return ['Missing password'];
        if(!first_name) return ['Missing first name'];
        if(!first_name) return ['Missing first name'];
        if(!paternal_surname) return ['Missing paternal surname'];
        if(!maternal_surname) return ['Missing maternal_surname'];
        if(!birthdate) return ['Missing birthdate'];
        if(!photo_url) return ['Missing photo_url'];
        if(!access_web) return ['Missing access_web'];
        if(!access_movil) return ['Missing access_movil'];
        if(!role_id) return ['Missing role_id'];
        
        const fecha_date = new Date();
        const fecha = fecha_date.toISOString();

        return [undefined, new CreateUserDto(username, password, first_name, paternal_surname, maternal_surname, birthdate, photo_url, access_web, access_movil, role_id, fecha, theme_color, !middle_name ? '': middle_name)]
        
    }

}