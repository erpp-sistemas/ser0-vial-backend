import { regularExps } from "../../../config/regular-exp";


export class LoginDto {

    private constructor(
        public username: string,
        public password: string
    ) { }

    static create( object: { [key: string]: any } ): [string?, LoginDto?] {

        const { username, password } = object;

        if( !username ) return ['Missing usuario'];
        if( !regularExps.email.test( username ) ) return ['Email is not valid']

        console.log("password mising:", password)
        if( !password ) return ['Missingg password']

        return [undefined, new LoginDto(username, password)]

    }

}