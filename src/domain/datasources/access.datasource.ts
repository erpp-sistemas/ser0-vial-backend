import { LoginDto } from "../dtos";
import { AccessEntity } from "../entities/access.entity";



export abstract class AccessDatasource {

    abstract login(loginDto: LoginDto): Promise<AccessEntity>;

}