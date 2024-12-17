import { LoginDto, AccessEntity } from "../../domain";
import { AccessDatasource } from "../../domain/datasources/access.datasource";
import { AccessRepository } from "../../domain/repositories/access.repository";


export class AccessRepositoryImpl implements AccessRepository {
  
    constructor(
        public datasource: AccessDatasource
    ){}
    
    login(loginDto: LoginDto): Promise<AccessEntity> {
        return this.datasource.login(loginDto)
    }

}