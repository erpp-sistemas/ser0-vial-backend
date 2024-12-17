import { LoginDto } from "../dtos";
import { AccessEntity } from "../entities/access.entity";



export abstract class AccessRepository {

    abstract login(loginDto: LoginDto): Promise<AccessEntity>;    

}